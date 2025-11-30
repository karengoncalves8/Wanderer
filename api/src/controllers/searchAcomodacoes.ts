// controllers/searchPassagens.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import BuscaAcomodacao from '../models/BuscaAcomodacao';
import { formatAcomodacoes } from '../utils/api_formater/acomodacaoFormater';
import { Currency } from '../constants/Currency';

dotenv.config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SERPAPI_URL = "https://serpapi.com/search.json";

export const acomodacoesController = {

    // Buscar acomodacoes
    searchAcomodacoes: async (req: Request, res: Response): Promise<void> => {
        const { cidade, checkin, checkout, hospedes, idioma, usuarioPais } = req.query;

        if (!cidade || !checkin || !checkout || !hospedes || !idioma || !usuarioPais) {
            res.status(400).json({ error: 'Parâmetros inválidos.' });
            return;
        }

        try {
            // 1. Checar se já existe no Mongo
            const existente = await BuscaAcomodacao.findOne({
                cidade: (cidade as string).toUpperCase(),
                checkin,
                checkout,
                hospedes,
                idioma,
                usuarioPais
            });

            if (existente) {
                console.log("🔎 Retornando do cache MongoDB");
                res.json(existente.resultados);
                return;
            }

            // 2. Montar URL e buscar na API externa
            const query = (cidade as string).trim().replace(/\s+/g, "+");
            const userCurrency = Currency[(idioma as string)] || 'BRL';
            const url = `${SERPAPI_URL}?engine=google_hotels&q=${query}&check_in_date=${checkin}&check_out_date=${checkout}&adults=${hospedes}&currency=${userCurrency}&gl=${usuarioPais}&hl=${idioma}&api_key=${SERPAPI_KEY}`;
    
            const response = await axios.get(url);

            const formattedAcomodacoes = formatAcomodacoes(response.data);

            // 3. Salvar no Mongo
            await BuscaAcomodacao.create({
                cidade: (cidade as string).toUpperCase(),
                checkin,
                checkout,
                hospedes,
                idioma,
                usuarioPais,
                resultados: formattedAcomodacoes
            });

            res.json(formattedAcomodacoes);

        } catch (error) {
            console.error("Erro ao chamar a API de acomodações:", error);
            res.status(500).json({ error: "Erro ao buscar dados de acomodações" });
        }
    }
};
