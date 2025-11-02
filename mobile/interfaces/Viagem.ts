import { ViagemStatus } from "@/enums/ViagemStatus";

export interface Viagem {
    id?: number,
    nome: string,
    dataIda: Date,
    dataVolta: Date,
    duracao: number,
    destino_cidade: string,
    destino_pais: string,
    status?: ViagemStatus
    img_url?: string
}