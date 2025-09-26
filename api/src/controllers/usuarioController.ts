import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario'
import UsuarioPreferencia from '../models/UsuarioPreferencias'

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

export const usuarioController = {
    // CRUD: Criar usuário
    createUser: async (req: Request, res: Response) => {
        try {
            const { nome, email, senha, dataNascimento, cidade, pais, preferencias } = req.body

            const hashedPassword = await bcrypt.hash(senha, 10)

            const usuario = await Usuario.create({
                nome,
                email,
                senha: hashedPassword,
                dataNascimento,
                cidade,
                pais
            })

            // Criar preferências do usuário, se fornecidas
            if (preferencias) {
                const usuarioPreferencia = await UsuarioPreferencia.create({
                    idioma: preferencias.idioma,
                    transporte: preferencias.transporte,
                    acomodacao: preferencias.acomodacao,
                    orcamento: preferencias.orcamento,
                    usuarioId: usuario.id // Relacionando a preferência com o usuário
                })
            }

            return res.status(201).json(usuario)
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao criar usuário', detalhes: error.message })
        }
    },

    // Login: Autenticar e gerar token JWT
    login: async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body

            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            const isMatch = await bcrypt.compare(senha, usuario.senha)
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha incorreta' })
            }

            const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' })

            return res.status(200).json({ token })
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao realizar login', detalhes: error.message })
        }
    },

    // CRUD: Listar todos os usuários e suas preferências
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await Usuario.findAll({
                include: [UsuarioPreferencia] // Incluindo as preferências do usuário na busca
            })
            return res.status(200).json(users)
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao listar usuários', detalhes: error.message })
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { nome, email, senha, dataNascimento, cidade, pais } = req.body

            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            // Criptografando a nova senha se for fornecida
            if (senha) {
                usuario.senha = await bcrypt.hash(senha, 10)
            }

            usuario.nome = nome || usuario.nome
            usuario.email = email || usuario.email
            usuario.dataNascimento = dataNascimento || usuario.dataNascimento
            usuario.cidade = cidade || usuario.cidade
            usuario.pais = pais || usuario.pais
            usuario.preferencias = usuario.preferencias

            await usuario.save()

            return res.status(200).json(usuario)
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário', detalhes: error.message })
        }
    },

    // CRUD: Atualizar preferências de usuário
    updateUserPreferences: async (req: Request, res: Response) => {
        try {
            const { usuarioId } = req.params
            const { idioma, transporte, acomodacao, orcamento } = req.body

            // Encontrar a preferência do usuário
            const preferencia = await UsuarioPreferencia.findOne({
                where: { usuarioId }
            })

            if (!preferencia) {
                return res.status(404).json({ message: 'Preferência não encontrada' })
            }

            // Atualizar as preferências
            preferencia.idioma = idioma || preferencia.idioma
            preferencia.transporte = transporte || preferencia.transporte
            preferencia.acomodacao = acomodacao || preferencia.acomodacao
            preferencia.orcamento = orcamento || preferencia.orcamento

            await preferencia.save()

            return res.status(200).json(preferencia)
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário', detalhes: error.message })
        }
    },

    // CRUD: Deletar preferências de usuário
    deleteUser: async (req: Request, res: Response) => {
        try {
            const { usuarioId } = req.params

            const preferencia = await Usuario.findOne({
                where: { id: usuarioId }
            })

            if (!preferencia) {
                return res.status(404).json({ message: 'Usuário não encontrada' })
            }

            await preferencia.destroy()

            return res.status(200).json({ message: 'Usuário deletado com sucesso' })
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao deletar usuário', detalhes: error.message })
        }
    }
}
