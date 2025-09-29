import { Router } from 'express'

import { acomodacoesController } from '../controllers/searchAcomodacoes'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

// Rotas protegidas (exige autenticação via JWT)
router.get('/', verifyToken, acomodacoesController.searchAcomodacoes)

export default router
