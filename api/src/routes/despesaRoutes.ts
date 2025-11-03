import { Router } from 'express'
import { despesaController } from '../controllers/despesaController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, despesaController.createDespesa)
router.get('/gastos/:gastosId', verifyToken, despesaController.getAllDespesasByGastosId)
router.get('/:id', verifyToken, despesaController.getDespesaById)
router.put('/:id', verifyToken, despesaController.updateDespesa)
router.delete('/:id', verifyToken, despesaController.deleteDespesa)

export default router
