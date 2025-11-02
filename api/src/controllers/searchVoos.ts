// controllers/searchPassagens.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import BuscarVoo from '../models/BuscaVoo';
import { formatVoos } from '../utils/api_formater/vooFormater';

dotenv.config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SERPAPI_URL = "https://serpapi.com/search.json";

function normalizePostDataToQueryString(postData: unknown): string {
	if (!postData) return "";
	if (typeof postData === "string") {
	  return postData.startsWith("?") ? postData.slice(1) : postData;
	}
	const usp = new URLSearchParams();
	Object.entries(postData as Record<string, unknown>).forEach(([k, v]) => {
	  if (v !== undefined && v !== null) usp.append(k, String(v));
	});
	return usp.toString();
}

export const voosController = {

	// Buscar voos
	searchVoos: async (req: Request, res: Response): Promise<void> => {
		const { iataOrigem, iataDestino, dataPartida, dataVolta, idaEVolta, classe } = req.query;

		const isIdaEVolta: boolean = typeof idaEVolta === 'string' && idaEVolta.toLowerCase() === 'true';

		if (!iataOrigem || !iataDestino || !dataPartida) {
			res.status(400).json({ error: 'Parâmetros obrigatórios: iataOrigem, iataDestino e dataPartida.' });
			return;
		}
		if (isIdaEVolta && !dataVolta) {
			res.status(400).json({ error: 'Para ida e volta, dataVolta é obrigatória.' });
			return;
		}

		console.log("🚀 Buscando voos para a data de", dataPartida);

		try {
			// 1. Checar se já existe no Mongo
			const existente = await BuscarVoo.findOne({
				iataOrigem: (iataOrigem as string).toUpperCase(),
				iataDestino: (iataDestino as string).toUpperCase(),
				dataPartida,
				dataVolta,
				idaEVolta: isIdaEVolta,
				classe
			});

			if (existente) {
				console.log("🔎 Retornando do cache MongoDB");
				res.json(existente.resultados);
				return;
			}

			// 2. Montar URL e buscar na API externa
			const type = isIdaEVolta ? "1" : "2";
			let flightUrl = `${SERPAPI_URL}?engine=google_flights`;
			flightUrl += `&departure_id=${(iataOrigem as string).toUpperCase()}`;
			flightUrl += `&arrival_id=${(iataDestino as string).toUpperCase()}`;
			flightUrl += `&outbound_date=${dataPartida}`;
			if (isIdaEVolta) flightUrl += `&return_date=${dataVolta}`;
			flightUrl += `&type=${type}`;
			flightUrl += `&travel_class=${classe}`;
			flightUrl += `&currency=BRL&hl=en&api_key=${SERPAPI_KEY}`;

			const response = await axios.get(flightUrl);

			const formattedFlights = formatVoos(response.data);

			const filteredFlights = formattedFlights.filter((voo) => {
				return voo.departure_airport.id === (iataOrigem as string).toUpperCase() && voo.arrival_airport.id === (iataDestino as string).toUpperCase();
			});

			const flightsWithRedirects = await Promise.all(
				filteredFlights.map(async (voo) => {
				  if (voo.booking_token) {
					const redirectUrl = await voosController.getBookingRedirectUrl(flightUrl, voo.booking_token, voo.airline);
					return { ...voo, booking_url: redirectUrl };
				  }
				  return voo;
				})
			  );

			// 3. Salvar no Mongo
			await BuscarVoo.create({
				iataOrigem: (iataOrigem as string).toUpperCase(),
				iataDestino: (iataDestino as string).toUpperCase(),
				dataPartida,
				dataVolta,
				idaEVolta: isIdaEVolta,
				classe,
				resultados: flightsWithRedirects
			});

			res.json(flightsWithRedirects);

		} catch (error) {
			console.error("Erro ao chamar a API de voos:", error);
			res.status(500).json({ error: "Erro ao buscar dados de voos" });
		}
	},

	async getBookingRedirectUrl(flightUrl: string, booking_token: string, airline: string): Promise<string | null> {
		try {
			flightUrl += `&booking_token=${booking_token}`;
			const response = await axios.get(flightUrl);
	  
			const options = response.data?.booking_options ?? [];
			if (options.length === 0) return "";
		
			// Pega a primeira opção "together" que tem a URL
			const together = options.find((option: any) => option.together.book_with === airline).together;

			if (!together?.booking_request?.url || !together.booking_request.post_data)  {
				console.log("🚀 URL ou post_data ausente.");
				return "";
			  }
		
			const url = together.booking_request.url;
			const postData = together.booking_request.post_data;
			
			const urlResponse = await axios.post(url, postData);
			
			const regex = /content="[^"]*url='([^']+)'/;
			const match = urlResponse.data.match(regex);

			if (match && match[1]) {
				return match[1];
			} else {
				return "";
			}
		} catch (error) {
			console.error("Erro ao gerar URL de redirecionamento:", error);
			return "";
		}
	},
};
