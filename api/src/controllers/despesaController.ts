import { Request, Response } from 'express'
import Despesa from '../models/Despesa'
import DespesaCategoria from '../models/DespesaCategoria'

export const despesaController = {
  createDespesa: async (req: Request, res: Response) => {
    try {
      const { nome, valor, gastosId, despesaCategoriaId } = req.body
      const despesa = await Despesa.create({ nome, valor, gastosId, despesaCategoriaId })
      return res.status(201).json(despesa)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar despesa', detalhes: error.message })
    }
  },

  getAllDespesas: async (_req: Request, res: Response) => {
    try {
      const despesas = await Despesa.findAll()
      return res.status(200).json(despesas)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar despesas', detalhes: error.message })
    }
  },

  getDespesaById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const despesa = await Despesa.findByPk(id, { include: [DespesaCategoria] })
      if (!despesa) return res.status(404).json({ message: 'Despesa não encontrada' })
      return res.status(200).json(despesa)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar despesa', detalhes: error.message })
    }
  },

  updateDespesa: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome, valor, gastosId, despesaCategoriaId } = req.body
      const despesa = await Despesa.findByPk(id)
      if (!despesa) return res.status(404).json({ message: 'Despesa não encontrada' })
      despesa.nome = nome ?? despesa.nome
      despesa.valor = valor ?? despesa.valor
      despesa.gastosId = gastosId ?? despesa.gastosId
      despesa.despesaCategoriaId = despesaCategoriaId ?? despesa.despesaCategoriaId
      await despesa.save()
      return res.status(200).json(despesa)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar despesa', detalhes: error.message })
    }
  },

  deleteDespesa: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const despesa = await Despesa.findByPk(id)
      if (!despesa) return res.status(404).json({ message: 'Despesa não encontrada' })
      await despesa.destroy()
      return res.status(200).json({ message: 'Despesa deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar despesa', detalhes: error.message })
    }
  },
}
