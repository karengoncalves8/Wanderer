import { Router } from 'express'
import { gastosController } from '../controllers/gastosController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, gastosController.createGastos)
router.get('/viagem/:id', verifyToken, gastosController.getGastosByViagemId)
router.get('/:id', verifyToken, gastosController.getGastosById)
router.put('/:id', verifyToken, gastosController.updateGastos)
router.delete('/:id', verifyToken, gastosController.deleteGastos)

export default router
