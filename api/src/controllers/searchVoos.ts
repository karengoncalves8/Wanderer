// controllers/searchPassagens.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import BuscarVoo from '../models/BuscaVoo';
import { formatVoos } from '../utils/api_formater/vooFormater';

dotenv.config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SERPAPI_URL = "https://serpapi.com/search.json";

export const voosController = {

	// Buscar voos
	searchVoos: async (req: Request, res: Response): Promise<void> => {
		const { iataOrigem, iataDestino, dataPartida, dataVolta, idaEVolta } = req.query;

		const isIdaEVolta: boolean = typeof idaEVolta === 'string' && idaEVolta.toLowerCase() === 'true';

		if (!iataOrigem || !iataDestino || !dataPartida) {
			res.status(400).json({ error: 'Parâmetros obrigatórios: iataOrigem, iataDestino e dataPartida.' });
			return;
		}
		if (isIdaEVolta && !dataVolta) {
			res.status(400).json({ error: 'Para ida e volta, dataVolta é obrigatória.' });
			return;
		}

		try {
			// 1. Checar se já existe no Mongo
			const existente = await BuscarVoo.findOne({
			iataOrigem: (iataOrigem as string).toUpperCase(),
			iataDestino: (iataDestino as string).toUpperCase(),
			dataPartida,
			dataVolta,
			idaEVolta: isIdaEVolta
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
			flightUrl += `&currency=BRL&hl=en&api_key=${SERPAPI_KEY}`;

			const response = await axios.get(flightUrl);

			const formattedFlights = formatVoos(response.data);

			// 3. Salvar no Mongo
			await BuscarVoo.create({
				iataOrigem: (iataOrigem as string).toUpperCase(),
				iataDestino: (iataDestino as string).toUpperCase(),
				dataPartida,
				dataVolta,
				idaEVolta: isIdaEVolta,
				resultados: formattedFlights
			});

			res.json(formattedFlights);

		} catch (error) {
			console.error("Erro ao chamar a API de voos:", error);
			res.status(500).json({ error: "Erro ao buscar dados de voos" });
		}
	}
};
