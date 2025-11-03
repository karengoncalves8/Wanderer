import Viagem from "../models/Viagem";
import Gastos from "../models/Gastos";
import Despesa from "../models/Despesa";
import DespesaCategoria from "../models/DespesaCategoria";

export const addNewDespesa = async (viagemId: number, nome: string, valor: number, categoriaNome: string) => {
    try {
        const viagem = await Viagem.findByPk(viagemId, { include: [Gastos] });
        const despesa_cat = await DespesaCategoria.findOne({ where: { nome: categoriaNome } });
        await Despesa.create({
            nome: `${nome}`,
            valor: valor,
            despesaCategoriaId: despesa_cat?.id,
            gastosId: viagem?.gastos.id
        })
        await Gastos.update({
            total: viagem?.gastos.total + valor
        }, { where: { id: viagem?.gastos.id } })
        
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}