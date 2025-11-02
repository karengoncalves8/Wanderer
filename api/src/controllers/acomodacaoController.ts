import { Request, Response } from 'express'
import Acomodacao from '../models/Acomodacao'

export const acomodacaoController = {
  createAcomodacao: async (req: Request, res: Response) => {
    try {
      const { nome, preco, tipo, localizacao, gps_long, gps_lat, check_in, check_out, data_entrada, data_saida, dias, viagemId } = req.body
      const acomodacao = await Acomodacao.create({ nome, preco, tipo, localizacao, gps_long, gps_lat, check_in, check_out, data_entrada, data_saida, dias, viagemId })
      return res.status(201).json(acomodacao)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar acomodação', detalhes: error.message })
    }
  },

  getAllAcomodacoes: async (_req: Request, res: Response) => {
    try {
      const acomodacoes = await Acomodacao.findAll()
      return res.status(200).json(acomodacoes)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar acomodações', detalhes: error.message })
    }
  },

  getAcomodacaoById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const acomodacao = await Acomodacao.findByPk(id)
      if (!acomodacao) return res.status(404).json({ message: 'Acomodação não encontrada' })
      return res.status(200).json(acomodacao)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar acomodação', detalhes: error.message })
    }
  },

  getAllAcomodacoesByViagemId: async (req: Request, res: Response) => {
    try {
      const { viagemId } = req.params
      const acomodacoes = await Acomodacao.findAll({ where: { viagemId } })
      return res.status(200).json(acomodacoes)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar acomodações', detalhes: error.message })
    }
  },

  updateAcomodacao: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome, preco, tipo, localizacao, gps_long, gps_lat, check_in, check_out, data_entrada, data_saida, dias, viagemId } = req.body
      const acomodacao = await Acomodacao.findByPk(id)
      if (!acomodacao) return res.status(404).json({ message: 'Acomodação não encontrada' })
      acomodacao.nome = nome ?? acomodacao.nome
      acomodacao.preco = preco ?? acomodacao.preco
      acomodacao.tipo = tipo ?? acomodacao.tipo
      acomodacao.localizacao = localizacao ?? acomodacao.localizacao
      acomodacao.gps_long = gps_long ?? acomodacao.gps_long
      acomodacao.gps_lat = gps_lat ?? acomodacao.gps_lat
      acomodacao.check_in = check_in ?? acomodacao.check_in
      acomodacao.check_out = check_out ?? acomodacao.check_out
      acomodacao.data_entrada = data_entrada ?? acomodacao.data_entrada
      acomodacao.data_saida = data_saida ?? acomodacao.data_saida
      acomodacao.dias = dias ?? acomodacao.dias
      acomodacao.viagemId = viagemId ?? acomodacao.viagemId
      await acomodacao.save()
      return res.status(200).json(acomodacao)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar acomodação', detalhes: error.message })
    }
  },

  deleteAcomodacao: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const acomodacao = await Acomodacao.findByPk(id)
      if (!acomodacao) return res.status(404).json({ message: 'Acomodação não encontrada' })
      await acomodacao.destroy()
      return res.status(200).json({ message: 'Acomodação deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar acomodação', detalhes: error.message })
    }
  },
}
