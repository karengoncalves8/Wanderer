export interface AtracaoResult {
    name: string;
    short_description?: string;
    full_address?: string;
    imgUrl?: string;
}

export interface Atracao {
    _id: string;
    language_code: string;
    city: string;
    results: AtracaoResult[];
}