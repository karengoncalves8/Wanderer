import { Request, Response } from 'express'

export const usuarioController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            return res.status(201).json('a')
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao salvar registro', detalhes: error.message })
        }
    } 
}