import { Router } from 'express'
import { despesaCategoriaController } from '../controllers/despesaCategoriaController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, despesaCategoriaController.createDespesaCategoria)
router.get('/', verifyToken, despesaCategoriaController.getAllDespesasCategoria)
router.get('/:id', verifyToken, despesaCategoriaController.getDespesaCategoriaById)
router.put('/:id', verifyToken, despesaCategoriaController.updateDespesaCategoria)
router.delete('/:id', verifyToken, despesaCategoriaController.deleteDespesaCategoria)

export default router
