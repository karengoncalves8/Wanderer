// models/FlightSearch.ts
import { Document, Schema, model } from "mongoose";
import { TravelInfo } from "../interfaces/travelInfoInterface";

export interface DestinoDoc extends Document {
    languageCode: string,
    userCountry: string,
    flag: "worldwide" | "local",
    name: string,
    imgsUrl: string[],
    results: TravelInfo[];
    createdAt: Date;
}

const DestinoSchema = new Schema<DestinoDoc>({
  languageCode: { type: String, required: true },
  userCountry: { type: String, required: false },
  flag: { type: String, enum: ["worldwide", "local"], required: true },
  name: { type: String, required: true },
  imgsUrl: { type: [String], required: true },
  results: { type: Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 720 } 
  // expira em 30 dias
}, {
  collection: 'Destinos' // nome da coleção
});

export default model<DestinoDoc>("Destinos", DestinoSchema);