import axios from "axios";

export const fetchImages = async (query: string): Promise<string[] | null> => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query,
                per_page: 5,
                client_id: process.env.UNSPLASH_ACCESS_KEY
            }
        });

        const results = response.data.results;
        if (results.length > 0) {
            let imgs = results.map((img: any) => img.urls.regular);
            return imgs;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        return null;
    }
};
