export interface Destino {
  _id: string;
  flag: string;
  name: string;
  languageCode: string;
  __v: number;
  createdAt: string;
  imgsUrl: string[];
  results: Results;
  userCountry: string;
}

export interface Results {
  location: Location;
  short_description: string;
  average_cost: AverageCost;
  landmarks: Landmark[];
  general_tips: Tip[];
  safety_info: Tip[];
  climate: Climate[];
  documents: DocumentRequirement[];
}

export interface Location {
  country: string;
  city: string;
}

export interface AverageCost {
  accomodation: string;
  food: string;
  transport: string;
  tourism: string;
  daily_total_estimated: string;
}

export interface Landmark {
  name: string;
  description: string;
}

export interface Tip {
  title: string;
  content: string;
}

export interface Climate {
  season: string;
  period: string;
  characteristics: string;
}

export interface DocumentRequirement {
  name: string;
  description: string;
}
