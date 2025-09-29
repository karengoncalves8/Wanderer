export interface AcomodacaoAPI {
    type: string,
    name: string, 
    description: string,
    link: string,
    gps_latitude: number,
    gps_longtitude: number,
    check_in_time: string,
    check_out_time: string,
    reviews: number,
    prices: number,
    images: string[],
    ratings: number,
    amenities: string[],
    info: string[],
    property_token: string,
    serpapi_property_details_link: string
}