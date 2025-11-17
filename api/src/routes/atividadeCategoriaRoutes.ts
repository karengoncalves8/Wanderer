import { Router } from 'express'
import { atividadeCategoriaController } from '../controllers/atividadeCategoriaController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, atividadeCategoriaController.createAtividadeCategoria)
router.get('/', verifyToken, atividadeCategoriaController.getAllAtividadesCategoria)
router.get('/:id', verifyToken, atividadeCategoriaController.getAtividadeCategoriaById)
router.put('/:id', verifyToken, atividadeCategoriaController.updateAtividadeCategoria)
router.delete('/:id', verifyToken, atividadeCategoriaController.deleteAtividadeCategoria)

export default router
