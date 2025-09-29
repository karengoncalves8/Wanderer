// models/FlightSearch.ts
import { Document, Schema, model } from "mongoose";
import { AcomodacaoAPI } from "../interfaces/acomodacaoInterface";

interface BuscaAcomodacaoDoc extends Document {
    cidade: string,
    checkin: Date,
    checkout: Date,
    hospedes: number,
    resultados: AcomodacaoAPI[]; 
    criadoEm: Date;
}

const HotelsSearchSchema = new Schema<BuscaAcomodacaoDoc>({
  cidade: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  hospedes: { type: Number, required: true },
  resultados: { type: Schema.Types.Mixed, required: true },
  criadoEm: { type: Date, default: Date.now, expires: 60 * 60 * 24 } 
  // expira em 24h (TTL index do Mongo)
}, {
  collection: 'Acomodacoes' // nome da coleção
});

export default model<BuscaAcomodacaoDoc>("HotelsSearch", HotelsSearchSchema);
