// models/FlightSearch.ts
import { Document, Schema, model } from "mongoose";
import { NearbyAttraction } from "../interfaces/nearbyAttractionInterface";

export interface AtracaoDoc extends Document {
    languageCode: string;   
    city: string;
    results: NearbyAttraction[];
    createdAt: Date;
}

const AtracaoSchema = new Schema<AtracaoDoc>({
  languageCode: { type: String, required: true },
  city: { type: String, required: true },
  results: { type: Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 720 } 
  // expira em 30 dias
}, {
  collection: 'Atracoes' // nome da coleção
});

export default model<AtracaoDoc>("Atracoes", AtracaoSchema);