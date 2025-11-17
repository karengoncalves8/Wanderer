import { Request, Response } from 'express'
import AtividadeCategoria from '../models/AtividadeCategoria'
import Atividade from '../models/Atividade'

export const atividadeCategoriaController = {
  createAtividadeCategoria: async (req: Request, res: Response) => {
    try {
      const { nome } = req.body
      const categoria = await AtividadeCategoria.create({ nome })
      return res.status(201).json(categoria)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar categoria de atividade', detalhes: error.message })
    }
  },

  getAllAtividadesCategoria: async (_req: Request, res: Response) => {
    try {
      const categorias = await AtividadeCategoria.findAll({ include: [Atividade] })
      return res.status(200).json(categorias)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar categorias de atividade', detalhes: error.message })
    }
  },

  getAtividadeCategoriaById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const categoria = await AtividadeCategoria.findByPk(id, { include: [Atividade] })
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' })
      return res.status(200).json(categoria)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar categoria de atividade', detalhes: error.message })
    }
  },

  updateAtividadeCategoria: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome } = req.body
      const categoria = await AtividadeCategoria.findByPk(id)
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' })
      categoria.nome = nome ?? categoria.nome
      await categoria.save()
      return res.status(200).json(categoria)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar categoria de atividade', detalhes: error.message })
    }
  },

  deleteAtividadeCategoria: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const categoria = await AtividadeCategoria.findByPk(id)
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' })
      await categoria.destroy()
      return res.status(200).json({ message: 'Categoria deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar categoria de atividade', detalhes: error.message })
    }
  },
}
