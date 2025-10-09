// models/FlightSearch.ts
import { Document, Schema, model } from "mongoose";
import { Voo } from "../interfaces/vooInterface";

interface BuscaVooDoc extends Document {
  iataOrigem: string;
  iataDestino: string;
  dataPartida: string;
  dataVolta?: string;
  idaEVolta: boolean;
  classe: number;
  resultados: Voo[]; 
  criadoEm: Date;
}

const FlightSearchSchema = new Schema<BuscaVooDoc>({
  iataOrigem: { type: String, required: true },
  iataDestino: { type: String, required: true },
  dataPartida: { type: String, required: true },
  dataVolta: { type: String },
  idaEVolta: { type: Boolean, required: true },
  classe: { type: Number, required: true },
  resultados: { type: Schema.Types.Mixed, required: true },
  criadoEm: { type: Date, default: Date.now, expires: 60 * 60 * 24 } 
  // expira em 24h (TTL index do Mongo)
}, {
  collection: 'Voos' // nome da coleção
});

export default model<BuscaVooDoc>("FlightSearch", FlightSearchSchema);
