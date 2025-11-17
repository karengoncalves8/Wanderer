import { Request, Response } from 'express'
import Despesa from '../models/Despesa'
import Gastos from '../models/Gastos'

export const gastosController = {
  createGastos: async (req: Request, res: Response) => {
    try {
      const { orcamento, total, viagemId } = req.body
      const gastos = await Gastos.create({ orcamento, total, viagemId })
      return res.status(201).json(gastos)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar gastos', detalhes: error.message })
    }
  },

  getAllGastos: async (_req: Request, res: Response) => {
    try {
      const gastos = await Gastos.findAll()
      return res.status(200).json(gastos)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar gastos', detalhes: error.message })
    }
  },

  getGastosById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const gastos = await Gastos.findByPk(id, { include: [Despesa] })
      if (!gastos) return res.status(404).json({ message: 'Gastos não encontrado' })
      return res.status(200).json(gastos)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar gastos', detalhes: error.message })
    }
  },

  getGastosByViagemId: async (req: Request, res: Response) => {
    try {
      const { viagemId } = req.params
      const gastos = await Gastos.findOne({ where: { viagemId }, include: [Despesa] })
      if (!gastos) return res.status(404).json({ message: 'Gastos não encontrado' })
      return res.status(200).json(gastos)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar gastos', detalhes: error.message })
    }
  },

  updateGastos: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { orcamento, total, viagemId } = req.body
      const gastos = await Gastos.findByPk(id)
      if (!gastos) return res.status(404).json({ message: 'Gastos não encontrado' })
      gastos.orcamento = orcamento ?? gastos.orcamento
      gastos.total = total ?? gastos.total
      gastos.viagemId = viagemId ?? gastos.viagemId
      await gastos.save()
      return res.status(200).json(gastos)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar gastos', detalhes: error.message })
    }
  },

  deleteGastos: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const gastos = await Gastos.findByPk(id)
      if (!gastos) return res.status(404).json({ message: 'Gastos não encontrado' })
      await gastos.destroy()
      return res.status(200).json({ message: 'Gastos deletado com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar gastos', detalhes: error.message })
    }
  },
}
