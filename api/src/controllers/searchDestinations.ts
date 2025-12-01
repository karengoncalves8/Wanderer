import { Request, Response } from 'express';
import Destino, { DestinoDoc } from '../models/Destino';

import { fetchCityDestinations, fetchTravelInfoByDestination, fetchWorldPopularDestinations } from '../services/destinoService';
import { fetchImages } from '../services/imageService';
import Atracao from '../models/Atracao';

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
    },

    getDestinationGuide: async (req: Request, res: Response): Promise<void> => {
        const { destination, userCountry, languageCode } = req.query;
        try {
            const fodase = await Destino.find();
            res.status(200).json(fodase[0]);
            return;

            const existente = await Destino.findOne({ where: { name: (destination as string).toUpperCase(), languageCode: (languageCode as string).toLowerCase(), userCountry: (userCountry as string).toUpperCase() } });

            if (existente && existente.results) {
                console.log("🔎 Retornando do cache MongoDB");
                res.status(200).json(existente);
                return;
            }

            console.log("🌐 Buscando novo guia de viagem da API externa");

            const info = await fetchTravelInfoByDestination(destination as string, languageCode as string, userCountry as string);

            if (!info) {
                res.status(404).json({ error: "Informações de destino não encontradas" });
                return;
            }

            const imgsUrl = await fetchImages(destination as string);

            const updatedDestino = await Destino.create({
                name: (destination as string).toUpperCase(),
                flag: "local",
                languageCode: (languageCode as string).toLowerCase(),
                userCountry: (userCountry as string).toUpperCase(),
                imgsUrl,
                results: info
            });

            res.status(200).json(updatedDestino);

        } catch (error) {
            console.error("Erro ao chamar a API de detalhes do destino:", error);
            res.status(500).json({ error: "Erro ao buscar dados de detalhes do destino" });
        }
    },

    searchNearbyAttractions: async (req: Request, res: Response): Promise<Response<any>>  => {
        const { city, languageCode } = req.query; 

        try {

            // 1. First, check if we already have this data
            const existente = await Atracao.findOne({
                languageCode: languageCode?.toString().toLowerCase().trim(),
                city: city?.toString().trim()
            }).lean();

            if (existente?.results?.length > 0) {
                console.log("🔎 Retornando do cache MongoDB");
                return res.json(existente);
            }

            // 2. If not in cache, fetch from external API
            console.log("🌐 Buscando novo guia de viagem da API externa");
            const nearbyAttractions = await fetchCityDestinations(city as string, languageCode as string);

            if (!nearbyAttractions) {
                res.status(404).json({ error: "Atrações próximas não encontradas" });
                return;
            }

            // Process each attraction to add images
            const attractionsWithImages = await Promise.all(
                nearbyAttractions.map(async (attraction: any) => {
                    // Fetch images for each attraction
                    const images = await fetchImages(attraction.name);
                    
                    return {
                        ...attraction,
                        imgUrl: images?.[0] || null
                    };
                })
            );

            // Create a single document with all results
            const atracao = new Atracao({
                languageCode: languageCode?.toString().toLowerCase().trim(),
                city: city?.toString().trim(),
                results: attractionsWithImages,
                createdAt: new Date()
            });

            // 5. Save to database
            await atracao.save();

            // 6. Return the results
            res.json(atracao);

        } catch (error) {
            console.error("Erro ao buscar atrações próximas:", error);
            res.status(500).json({ error: "Erro ao buscar atrações próximas" });
        }
    }
};