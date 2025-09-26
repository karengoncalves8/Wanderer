import { Router } from 'express'
import { usuarioController } from '../controllers/usuarioController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

// Rotas públicas
router.post('/login', usuarioController.login)
router.post('/', usuarioController.createUser)

// Rotas protegidas (exige autenticação via JWT)
router.get('/', verifyToken, usuarioController.getAllUsers)
router.put('/:id', verifyToken, usuarioController.updateUser)
router.put('/:id/preferencias', verifyToken, usuarioController.updateUserPreferences)
router.delete('/:id', verifyToken, usuarioController.deleteUser)

export default router
