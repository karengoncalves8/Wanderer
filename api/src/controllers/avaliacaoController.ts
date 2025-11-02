import { Request, Response } from 'express'
import Avaliacao from '../models/Avaliacao'

export const avaliacaoController = {
  createAvaliacao: async (req: Request, res: Response) => {
    try {
      const { nota, comentario, acomodacaoId, atividadeId } = req.body
      const avaliacao = await Avaliacao.create({ nota, comentario, acomodacaoId, atividadeId })
      return res.status(201).json(avaliacao)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar avaliação', detalhes: error.message })
    }
  },

  getAllAvaliacoes: async (_req: Request, res: Response) => {
    try {
      const avaliacoes = await Avaliacao.findAll()
      return res.status(200).json(avaliacoes)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar avaliações', detalhes: error.message })
    }
  },

  getAvaliacaoById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const avaliacao = await Avaliacao.findByPk(id)
      if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada' })
      return res.status(200).json(avaliacao)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar avaliação', detalhes: error.message })
    }
  },

  updateAvaliacao: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nota, comentario, acomodacaoId, atividadeId } = req.body
      const avaliacao = await Avaliacao.findByPk(id)
      if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada' })
      avaliacao.nota = nota ?? avaliacao.nota
      avaliacao.comentario = comentario ?? avaliacao.comentario
      avaliacao.acomodacaoId = acomodacaoId ?? avaliacao.acomodacaoId
      avaliacao.atividadeId = atividadeId ?? avaliacao.atividadeId
      await avaliacao.save()
      return res.status(200).json(avaliacao)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar avaliação', detalhes: error.message })
    }
  },

  deleteAvaliacao: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const avaliacao = await Avaliacao.findByPk(id)
      if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada' })
      await avaliacao.destroy()
      return res.status(200).json({ message: 'Avaliação deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar avaliação', detalhes: error.message })
    }
  },
}
