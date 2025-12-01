export interface NearbyAttraction {
  name: string,
  short_description: string;
  full_address: string;
  imgUrl?: string;
}

export interface NearbyAttractionResponse {
  results: NearbyAttraction[];
}

export const nearbyAttractionResponseSchema = {
  "type": "object",
  "properties": {
    "results": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "short_description": { "type": "string" },
          "full_address": { "type": "string" }
        },
        "required": [
          "name",
          "short_description",
          "full_address"
        ]
      }
    },
    "city": { "type": "string" }
  },
  "required": ["results", "city"]
};
    
