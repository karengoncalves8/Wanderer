import { Request, Response } from 'express'
import Acomodacao from '../models/Acomodacao'
import Atividade from '../models/Atividade'
import Gastos from '../models/Gastos'
import Lista from '../models/Lista'
import Passagem from '../models/Passagem'
import Viagem from '../models/Viagem'
import { checkViagemStatus } from '../utils/check/checkViagemStatus'

export const viagemController = {
  // CRUD: Criar viagem
  createViagem: async (req: Request, res: Response) => {
    try {
      const { usuario_id } = req.params
      const { nome, dataIda, dataVolta, duracao, destino_cidade, destino_pais, orcamento, img_url } = req.body

      const status = checkViagemStatus(dataIda, dataVolta)
      const viagem = await Viagem.create({
        nome,
        dataIda,
        dataVolta,
        duracao,
        destino_cidade,
        destino_pais,
        img_url,
        usuario_id,
        status
      })

      const gastos = await Gastos.create({
        orcamento,
        viagemId: viagem.id
      })

      return res.status(201).json(viagem)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar viagem', detalhes: error.message })
    }
  },

  // CRUD: Listar todas as viagens
  getAllViagens: async (req: Request, res: Response) => {
    try {
      const { usuario_id } = req.params
      const viagens = await Viagem.findAll({ where: { usuario_id } })
      return res.status(200).json(viagens)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar viagens', detalhes: error.message })
    }
  },

  // CRUD: Obter viagem por ID
  getViagemById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const viagem = await Viagem.findByPk(id, {
        include: [Gastos, Acomodacao, Passagem, Atividade, Lista]
      })

      if (!viagem) {
        return res.status(404).json({ message: 'Viagem não encontrada' })
      }

      return res.status(200).json(viagem)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar viagem', detalhes: error.message })
    }
  },

  // CRUD: Atualizar viagem
  updateViagem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome, dataIda, dataVolta, duracao, destino_cidade, destino_pais, img_url } = req.body

      const status = checkViagemStatus(dataIda, dataVolta)
      const viagem = await Viagem.findByPk(id)
      if (!viagem) {
        return res.status(404).json({ message: 'Viagem não encontrada' })
      }

      viagem.nome = nome ?? viagem.nome
      viagem.dataIda = dataIda ?? viagem.dataIda
      viagem.dataVolta = dataVolta ?? viagem.dataVolta
      viagem.duracao = duracao ?? viagem.duracao
      viagem.destino_cidade = destino_cidade ?? viagem.destino_cidade
      viagem.destino_pais = destino_pais ?? viagem.destino_pais
      viagem.img_url = img_url ?? viagem.img_url
      viagem.status = status

      await viagem.save()

      return res.status(200).json(viagem)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar viagem', detalhes: error.message })
    }
  },

  // CRUD: Deletar viagem
  deleteViagem: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const viagem = await Viagem.findByPk(id)

      if (!viagem) {
        return res.status(404).json({ message: 'Viagem não encontrada' })
      }

      await viagem.destroy()
      return res.status(200).json({ message: 'Viagem deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar viagem', detalhes: error.message })
    }
  },

  updateAllViagensStatus: async (req: Request, res: Response) => {
    try {
      const { usuario_id } = req.params
      const viagens = await Viagem.findAll({ where: { usuario_id } })
      viagens.forEach(viagem => {
        const status = checkViagemStatus(viagem.dataIda, viagem.dataVolta)
        viagem.status = status
        viagem.save()
      })
      return res.status(200).json(viagens)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar viagens', detalhes: error.message })
    }
  }
}
