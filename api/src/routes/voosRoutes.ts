import { Router } from 'express'

import { voosController } from '../controllers/searchVoos'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

// Rotas protegidas (exige autenticação via JWT)
router.get('/', verifyToken, voosController.searchVoos)

export default router
