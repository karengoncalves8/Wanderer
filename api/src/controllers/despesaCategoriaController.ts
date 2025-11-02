import { Request, Response } from 'express'
import DespesaCategoria from '../models/DespesaCategoria'
import Despesa from '../models/Despesa'

export const despesaCategoriaController = {
  createDespesaCategoria: async (req: Request, res: Response) => {
    try {
      const { nome } = req.body
      const categoria = await DespesaCategoria.create({ nome })
      return res.status(201).json(categoria)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar categoria', detalhes: error.message })
    }
  },

  getAllDespesasCategoria: async (_req: Request, res: Response) => {
    try {
      const categorias = await DespesaCategoria.findAll({ include: [Despesa] })
      return res.status(200).json(categorias)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar categorias', detalhes: error.message })
    }
  },

  getDespesaCategoriaById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const categoria = await DespesaCategoria.findByPk(id, { include: [Despesa] })
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' })
      return res.status(200).json(categoria)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar categoria', detalhes: error.message })
    }
  },

  updateDespesaCategoria: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome } = req.body
      const categoria = await DespesaCategoria.findByPk(id)
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' })
      categoria.nome = nome ?? categoria.nome
      await categoria.save()
      return res.status(200).json(categoria)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar categoria', detalhes: error.message })
    }
  },

  deleteDespesaCategoria: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const categoria = await DespesaCategoria.findByPk(id)
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' })
      await categoria.destroy()
      return res.status(200).json({ message: 'Categoria deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar categoria', detalhes: error.message })
    }
  },
}
