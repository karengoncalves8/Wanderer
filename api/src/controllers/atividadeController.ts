import { Request, Response } from 'express'
import Atividade from '../models/Atividade'
import AtividadeCategoria from '../models/AtividadeCategoria'
import AtividadeLocal from '../models/AtividadeLocal'

export const atividadeController = {
  // Criar atividade e seus dados de local
  createAtividade: async (req: Request, res: Response) => {
    try {
      const { nome, data, hora_inicio, hora_fim, preco, viagemId, local, atividadeCategoriaId } = req.body

      const atividade = await Atividade.create({ nome, data, hora_inicio, hora_fim, preco, viagemId, atividadeCategoriaId })

      if (local) {
        await AtividadeLocal.create({
          localizacao: local.localizacao,
          lat: local.lat,
          long: local.long,
          atividadeId: atividade.id,
        })
      }

      const created = await Atividade.findByPk(atividade.id, { include: [AtividadeLocal] })
      return res.status(201).json(created)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao criar atividade', detalhes: error.message })
    }
  },

  // Listar atividades com local
  getAllAtividades: async (_req: Request, res: Response) => {
    try {
      const atividades = await Atividade.findAll({ include: [AtividadeLocal] })
      return res.status(200).json(atividades)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao listar atividades', detalhes: error.message })
    }
  },

  getAllAtividadesByViagemId: async (req: Request, res: Response) => {
    try {
      const { viagemId } = req.params
      const atividades = await Atividade.findAll({ where: { viagemId }, include: [AtividadeLocal, AtividadeCategoria] })
      return res.status(200).json(atividades)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar atividades', detalhes: error.message })
    }
  },

  // Obter uma atividade
  getAtividadeById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const atividade = await Atividade.findByPk(id, { include: [AtividadeLocal, AtividadeCategoria] })
      if (!atividade) return res.status(404).json({ message: 'Atividade não encontrada' })
      return res.status(200).json(atividade)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao buscar atividade', detalhes: error.message })
    }
  },

  // Atualizar atividade e substituir local (opcional)
  updateAtividade: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { nome, data, hora_inicio, hora_fim, preco, viagemId, local, atividadeCategoriaId } = req.body

      const atividade = await Atividade.findByPk(id)
      if (!atividade) return res.status(404).json({ message: 'Atividade não encontrada' })

      atividade.nome = nome ?? atividade.nome
      atividade.data = data ?? atividade.data
      atividade.hora_inicio = hora_inicio ?? atividade.hora_inicio
      atividade.hora_fim = hora_fim ?? atividade.hora_fim
      atividade.preco = preco ?? atividade.preco
      atividade.viagemId = viagemId ?? atividade.viagemId
      atividade.atividadeCategoriaId = atividadeCategoriaId ?? atividade.atividadeCategoriaId
      await atividade.save()

      if (local) {
        // mantém um registro de local por atividade
        const existingLocal = await AtividadeLocal.findOne({ where: { atividadeId: atividade.id } })
        if (existingLocal) {
          existingLocal.localizacao = local.localizacao ?? existingLocal.localizacao
          existingLocal.lat = local.lat ?? existingLocal.lat
          existingLocal.long = local.long ?? existingLocal.long
          await existingLocal.save()
        } else {
          await AtividadeLocal.create({
            localizacao: local.localizacao,
            lat: local.lat,
            long: local.long,
            atividadeId: atividade.id,
          })
        }
      }

      const updated = await Atividade.findByPk(atividade.id, { include: [AtividadeLocal, AtividadeCategoria] })
      return res.status(200).json(updated)
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar atividade', detalhes: error.message })
    }
  },

  // Deletar atividade e seu local
  deleteAtividade: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const atividade = await Atividade.findByPk(id)
      if (!atividade) return res.status(404).json({ message: 'Atividade não encontrada' })

      await AtividadeLocal.destroy({ where: { atividadeId: atividade.id } })
      await atividade.destroy()
      return res.status(200).json({ message: 'Atividade deletada com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar atividade', detalhes: error.message })
    }
  },
}
