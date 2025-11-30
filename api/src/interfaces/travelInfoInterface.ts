interface AverageCost {
  accomodation: string;
  food: string;
  transport: string;
  tourism: string;
  daily_total_estimated: string;
}

interface Landmark {
  name: string;
  description: string;
}

interface GeneralTip {
  title: string;
  content: string;
}

interface SafetyInfo {
  title: string;
  content: string;
}

interface Climate {
  season: string;
  period: string;
  characteristics: string;
}

interface Document {
  name: string;
  description: string;
}

interface Location {
  country: string;
  city: string;
}

export interface TravelInfo {
  location: Location;
  short_description: string;
  average_cost: AverageCost;
  landmarks: Landmark[];
  general_tips: GeneralTip[];
  safety_info: SafetyInfo[];
  climate: Climate[];
  documents: Document[];
}

export const travelInfoResponseSchema = {
  "type": "object",
  "properties": {
    "location": {
      "type": "object",
      "properties": {
        "country": { "type": "string" },
        "city": { "type": "string" }
      },
      "required": ["country", "city"]
    },
    "short_description": { "type": "string" },
    "average_cost": {
      "type": "object",
      "properties": {
        "accomodation": { "type": "string" },
        "food": { "type": "string" },
        "transport": { "type": "string" },
        "tourism": { "type": "string" },
        "daily_total_estimated": { "type": "string" }
      }
    },
    "landmarks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "description": { "type": "string" }
        },
        "required": ["name", "description"]
      }
    },
    "general_tips": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "content": { "type": "string" }
        },
        "required": ["title", "content"]
      }
    },
    "safety_info": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "content": { "type": "string" }
        },
        "required": ["title", "content"]
      }
    },
    "climate": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "season": { "type": "string" },
          "period": { "type": "string" },
          "characteristics": { "type": "string" }
        },
        "required": ["season", "period", "characteristics"]
      }
    },
    "documents": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "description": { "type": "string" }
        },
        "required": ["name", "description"]
      }
    }
  },
  "required": [
    "location",
    "short_description",
    "average_cost",
    "landmarks",
    "general_tips",
    "safety_info",
    "climate",
    "documents"
  ]
};
