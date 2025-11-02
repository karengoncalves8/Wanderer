import { Router } from 'express'
import { viagemController } from '../controllers/viagemController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/:usuario_id', verifyToken, viagemController.createViagem)
router.get('/:usuario_id', verifyToken, viagemController.getAllViagens)
router.get('/:id', verifyToken, viagemController.getViagemById)
router.put('/:id', verifyToken, viagemController.updateViagem)
router.delete('/:id', verifyToken, viagemController.deleteViagem)
router.get('/:usuario_id/status', verifyToken, viagemController.updateAllViagensStatus)

export default router
