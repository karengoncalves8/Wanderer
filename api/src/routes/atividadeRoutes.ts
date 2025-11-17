import { Router } from 'express'
import { atividadeController } from '../controllers/atividadeController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, atividadeController.createAtividade)
router.get('/viagem/:id', verifyToken, atividadeController.getAllAtividadesByViagemId)
router.get('/:id', verifyToken, atividadeController.getAtividadeById)
router.put('/:id', verifyToken, atividadeController.updateAtividade)
router.delete('/:id', verifyToken, atividadeController.deleteAtividade)

export default router
