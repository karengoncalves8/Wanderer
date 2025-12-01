import { GoogleGenAI } from '@google/genai';

import { travelInfoResponseSchema, TravelInfo } from '../interfaces/travelInfoInterface';

import axios from 'axios';
import { NearbyAttraction, nearbyAttractionResponseSchema } from '../interfaces/nearbyAttractionInterface';

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SERPAPI_URL = "https://serpapi.com/search.json";

const mapResponseToTravelInfo = (data: any): TravelInfo => {
    return {
        location: data.location,
        short_description: data.short_description,
        average_cost: data.average_cost,
        landmarks: data.landmarks,
        general_tips: data.general_tips,
        safety_info: data.safety_info,
        climate: data.climate,
        documents: data.documents
    };
};

export const fetchTravelInfoByDestination = async (destination: string, languageCode: string, userCountry: string): Promise<TravelInfo | null> => {
    try {

        const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GENAI_API_KEY as string});

        // Prompt to generate the travel guide
        const prompt = `give me a travel guide for ${destination} in ${languageCode} (code for ISO 639-1) with the following topics: Location (country and city, if location provided is a country then let city info empty); Short description about the destination; Average daily cost; best places to visit and short descriptions about each of them; general tips; information about safety and tips; climate; documents need as a citizen of ${userCountry} (code for ISO 3166-1 alpha-2).`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: travelInfoResponseSchema, 
            },
        });

        const travelInfo: TravelInfo = mapResponseToTravelInfo(JSON.parse(response.text));

        if (!travelInfo) {
            throw new Error("Failed to parse travel info from Gemini");
        }

        return travelInfo;

    } catch (error) {
        console.error("Error generating content:", error);
        return null;
    }
}

export const fetchWorldPopularDestinations = async (languageCode: string) => {
    try {
        const currentYear = new Date().getFullYear();
        const query = `most popular cities to visit in ${currentYear}`;
        const url = `${SERPAPI_URL}?engine=google&q=${query}&gl=us&hl=${languageCode}&api_key=${SERPAPI_KEY}`;
        
        const response = await axios.get(url);

        const data = response.data;
        
        if(!data || !data.answer_box || !data.answer_box.expanded_list){
            console.error("Error when fetching popular destinations: Invalid response structure from SerpAPI:", response);
            throw new Error("Invalid response structure from SerpAPI");
        }

        return data.answer_box.expanded_list.map((result: any) => result.title.toUpperCase());
    }
    catch (error) {
        console.error("Error fetching popular destinations:", error);
    }
}

const mapResponseToNearbyAttractions = (data: any) => {
    return data.results.map((attraction: any) => ({
        name: attraction.name,
        short_description: attraction.short_description,
        full_address: attraction.full_address,
        imgUrl: attraction.imgUrl
    }));
}

export const fetchCityDestinations = async (city: string, languageCode: string) => {
    try {

        const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GENAI_API_KEY as string});

        // Prompt to generate the travel guide
        const prompt = `give me a top 5 activites to do in the city ${city} with the following topics: Name of the attraction; Short description about the activity (max 2 lines); Full adress. Answer in the language ${languageCode} (code for ISO 639-1)`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: nearbyAttractionResponseSchema, 
            },
        });

        const nearbyAttractions: NearbyAttraction[] = mapResponseToNearbyAttractions(JSON.parse(response.text));

        if (!nearbyAttractions) {
            throw new Error("Failed to parse nearby attractions from Gemini");
        }

        return nearbyAttractions;
    } catch (error) {
        console.error("Error generating content:", error);
        return null;
    }
}