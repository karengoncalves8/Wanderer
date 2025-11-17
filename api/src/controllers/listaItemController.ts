import { Request, Response } from 'express'
import ListaItem from '../models/ListaItem'

export const listaItemController = {
  createListaItem: async (req: Request, res: Response) => {
    try {
      const { nome, status, listaId } = req.body
      const item = await ListaItem.create({ nome, status, listaId })
      return res.status(201).json(item)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar item da lista', detalhes: error.message })
    }
  },

  getAllListaItems: async (_req: Request, res: Response) => {
    try {
      const itens = await ListaItem.findAll()
      return res.status(200).json(itens)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar itens da lista', detalhes: error.message })
    }
  },

  getListaItemById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const item = await ListaItem.findByPk(id)
      if (!item) return res.status(404).json({ message: 'Item não encontrado' })
      return res.status(200).json(item)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar item da lista', detalhes: error.message })
    }
  },

  updateListaItem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome, status, listaId } = req.body
      const item = await ListaItem.findByPk(id)
      if (!item) return res.status(404).json({ message: 'Item não encontrado' })
      item.nome = nome ?? item.nome
      item.status = status ?? item.status
      item.listaId = listaId ?? item.listaId
      await item.save()
      return res.status(200).json(item)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar item da lista', detalhes: error.message })
    }
  },

  deleteListaItem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const item = await ListaItem.findByPk(id)
      if (!item) return res.status(404).json({ message: 'Item não encontrado' })
      await item.destroy()
      return res.status(200).json({ message: 'Item deletado com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar item da lista', detalhes: error.message })
    }
  },
}
