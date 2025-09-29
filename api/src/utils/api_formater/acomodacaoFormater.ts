import { AcomodacaoAPI } from "../../interfaces/acomodacaoInterface";


export const formatAcomodacoes = (apiData: any): AcomodacaoAPI[] => {
  const formatted: AcomodacaoAPI[] = [];

    apiData.properties.forEach((prop: any) => {
        formatted.push({
        type: prop.type || '',
        name: prop.name || '',
        description: prop.description || '', 
        link: prop.link || '',
        gps_latitude: prop.gps_coordinates?.latitude || 0,
        gps_longtitude: prop.gps_coordinates?.longitude || 0,
        check_in_time: prop.check_in_time || '',
        check_out_time: prop.check_out_time || '',
        reviews: prop.reviews || 0,
        prices: prop.total_rate?.extracted_lowest || prop.rate_per_night?.extracted_lowest || 0,
        images: prop.images?.map((img: any) => img.original_image || img.thumbnail) || [],
        ratings: prop.overall_rating || 0,
        amenities: prop.amenities || [],
        info: prop.essential_info || [],
        property_token: prop.property_token || '',
        serpapi_property_details_link: prop.serpapi_property_details_link || ''
      });
    });

  return formatted;
};