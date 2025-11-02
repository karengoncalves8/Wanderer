import { Router } from 'express'
import { passagemController } from '../controllers/passagemController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, passagemController.createPassagem)
router.get('/', verifyToken, passagemController.getAllPassagens)
router.get('/:id', verifyToken, passagemController.getPassagemById)
router.put('/:id', verifyToken, passagemController.updatePassagem)
router.delete('/:id', verifyToken, passagemController.deletePassagem)

export default router
