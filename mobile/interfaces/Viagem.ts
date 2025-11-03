import { ViagemStatus } from "@/enums/ViagemStatus";
import { Acomodacao } from "./Acomodacao";
import { Gastos } from "./Gastos";
import { Atividade } from "./Atividade";
import { Passagem } from "./Passagem";
import { Lista } from "./Lista";

export interface Viagem {
    id?: number,
    nome: string,
    dataIda: Date,
    dataVolta: Date,
    duracao: number,
    destino_cidade: string,
    destino_pais: string,
    status?: ViagemStatus
    img_url?: string,
    acomodacoes?: Acomodacao[]
    gastos?: Gastos
    atividades?: Atividade[]
    passagens?: Passagem[]
    listas?: Lista[]
}