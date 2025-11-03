import { Request, Response } from 'express'
import Passagem from '../models/Passagem'
import PassagemLocal from '../models/PassagemLocal'
import Despesa from '../models/Despesa'
import Gastos from '../models/Gastos'
import Viagem from '../models/Viagem'
import DespesaCategoria from '../models/DespesaCategoria'
import { addNewDespesa } from '../services/gastosService'

export const passagemController = {
  // Criar passagem junto com locais (partida/chegada ou múltiplos trechos)
  createPassagem: async (req: Request, res: Response) => {
    try {
      const { companhia, classe, preco, duracao, numero, viagemId, locais } = req.body

      const passagem = await Passagem.create({ companhia, classe, preco, duracao, numero, viagemId })

      if (Array.isArray(locais)) {
        const payload = locais.map((l: any) => ({
          tipo: l.tipo,
          data: l.data,
          iata: l.iata,
          localizacao: l.localizacao,
          passagemId: passagem.id,
        }))
        await PassagemLocal.bulkCreate(payload)
      }

      const created = await Passagem.findByPk(passagem.id, { include: [PassagemLocal] })

      addNewDespesa(viagemId, `${passagem.companhia} - ${passagem.numero}`, preco, 'Transporte')

      return res.status(201).json(created)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar passagem', detalhes: error.message })
    }
  },

  // Listar todas as passagens com seus locais
  getAllPassagens: async (_req: Request, res: Response) => {
    try {
      const passagens = await Passagem.findAll({ include: [PassagemLocal] })
      return res.status(200).json(passagens)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar passagens', detalhes: error.message })
    }
  },

  getAllPassagensByViagemId: async (req: Request, res: Response) => {
    try {
      const { viagemId } = req.params
      const passagens = await Passagem.findAll({ where: { viagemId }, include: [PassagemLocal] })
      return res.status(200).json(passagens)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar passagens', detalhes: error.message })
    }
  },

  // Obter por ID com locais
  getPassagemById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const passagem = await Passagem.findByPk(id, { include: [PassagemLocal] })
      if (!passagem) return res.status(404).json({ message: 'Passagem não encontrada' })
      return res.status(200).json(passagem)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar passagem', detalhes: error.message })
    }
  },

  // Atualizar passagem e substituir locais (opcional)
  updatePassagem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { companhia, classe, preco, duracao, numero, viagemId, locais } = req.body

      const passagem = await Passagem.findByPk(id)
      if (!passagem) return res.status(404).json({ message: 'Passagem não encontrada' })

      passagem.companhia = companhia ?? passagem.companhia
      passagem.classe = classe ?? passagem.classe
      passagem.preco = preco ?? passagem.preco
      passagem.duracao = duracao ?? passagem.duracao
      passagem.numero = numero ?? passagem.numero
      passagem.viagemId = viagemId ?? passagem.viagemId
      await passagem.save()

      if (Array.isArray(locais)) {
        await PassagemLocal.destroy({ where: { passagemId: passagem.id } })
        const payload = locais.map((l: any) => ({
          tipo: l.tipo,
          data: l.data,
          iata: l.iata,
          localizacao: l.localizacao,
          passagemId: passagem.id,
        }))
        await PassagemLocal.bulkCreate(payload)
      }

      const updated = await Passagem.findByPk(passagem.id, { include: [PassagemLocal] })
      return res.status(200).json(updated)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar passagem', detalhes: error.message })
    }
  },

  // Deletar passagem e seus locais
  deletePassagem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const passagem = await Passagem.findByPk(id)
      if (!passagem) return res.status(404).json({ message: 'Passagem não encontrada' })

      await PassagemLocal.destroy({ where: { passagemId: passagem.id } })
      await passagem.destroy()
      return res.status(200).json({ message: 'Passagem deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar passagem', detalhes: error.message })
    }
  },
}
