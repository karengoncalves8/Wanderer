import { Request, Response } from 'express';
import Destino, { DestinoDoc } from '../models/Destino';

import { fetchTravelInfoByDestination, fetchWorldPopularDestinations } from '../services/destinoService';
import { fetchImages } from '../services/imageService';

export const destinosController = {

    // Top 10 destinos populares mundiais
    searchPopularDestinations: async (req: Request, res: Response): Promise<void> => {
        const { languageCode } = req.query;
        try {
            // 1. Checar se já existe a pesquisa no MongoDB
            const existentes = await Destino.find({
                flag: "worldwide",
                languageCode: languageCode?.toString().toLowerCase()
            });

            if (existentes.length > 0) {
                console.log("🔎 Retornando do cache MongoDB");
                res.json(existentes);
                return;
            }

            const popularDestinations = await fetchWorldPopularDestinations(languageCode as string);

            // Fetch images in parallel
            const destinations = await Promise.all(
                (popularDestinations as string[]).map(async (dest) => {
                    const imgsUrl = await fetchImages(dest);
                    return await Destino.findOneAndUpdate(
                        {
                            name: dest.toUpperCase(),
                            languageCode: languageCode?.toString().toLowerCase(),
                            flag: "worldwide"
                        },
                        {
                            $setOnInsert: {
                                imgsUrl: imgsUrl
                            }
                        },
                        { upsert: true, new: true }
                    );
                })
            );

            res.json(destinations);

        } catch (error) {
            console.error("Erro ao chamar a API de destinos populares:", error);
            res.status(500).json({ error: "Erro ao buscar dados de destinos populares" });
        }
    },
    
    // Guia de viagem de um destino específico
    searchDestinationDetails: async (req: Request, res: Response): Promise<void> => {
        const { objId, userCountry } = req.query;
        try {
            const existente = await Destino.findById(objId as string);

            if (existente && existente.results && existente.userCountry.toUpperCase() === (userCountry as string).toUpperCase()) {
                console.log("🔎 Retornando do cache MongoDB");
                res.json(existente);
                return;
            }

            console.log("🌐 Buscando novo guia de viagem da API externa");

            const info = await fetchTravelInfoByDestination(existente.name, existente.languageCode, userCountry as string);

            if (!info) {
                res.status(404).json({ error: "Informações de destino não encontradas" });
                return;
            }

            const updatedDestino = await Destino.findOneAndUpdate(
            {
                _id: objId
            },
            {
                userCountry: (userCountry as string).toUpperCase(),
                results: info
            }, { new: true }
        );

            res.json(updatedDestino);

        } catch (error) {
            console.error("Erro ao chamar a API de detalhes do destino:", error);
            res.status(500).json({ error: "Erro ao buscar dados de detalhes do destino" });
        }
    }
};