import { Request, Response } from 'express'
import Lista from '../models/Lista'
import ListaItem from '../models/ListaItem'

export const listaController = {
  createLista: async (req: Request, res: Response) => {
    try {
      const { titulo, viagemId } = req.body
      const lista = await Lista.create({ titulo, viagemId })
      return res.status(201).json(lista)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar lista', detalhes: error.message })
    }
  },

  getAllListas: async (_req: Request, res: Response) => {
    try {
      const listas = await Lista.findAll({ include: [ListaItem] })
      return res.status(200).json(listas)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar listas', detalhes: error.message })
    }
  },

  getAllListasByViagemId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const listas = await Lista.findAll({ where: { viagemId: id }, include: [ListaItem] })
      return res.status(200).json(listas)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar listas', detalhes: error.message })
    }
  },

  getListaById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const lista = await Lista.findByPk(id, { include: [ListaItem] })
      if (!lista) return res.status(404).json({ message: 'Lista não encontrada' })
      return res.status(200).json(lista)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar lista', detalhes: error.message })
    }
  },

  updateLista: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { titulo, viagemId } = req.body
      const lista = await Lista.findByPk(id)
      if (!lista) return res.status(404).json({ message: 'Lista não encontrada' })
      lista.titulo = titulo ?? lista.titulo
      lista.viagemId = viagemId ?? lista.viagemId
      await lista.save()
      return res.status(200).json(lista)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar lista', detalhes: error.message })
    }
  },

  deleteLista: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const lista = await Lista.findByPk(id)
      if (!lista) return res.status(404).json({ message: 'Lista não encontrada' })
      await lista.destroy()
      return res.status(200).json({ message: 'Lista deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar lista', detalhes: error.message })
    }
  },
}
