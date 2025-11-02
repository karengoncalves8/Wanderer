import { Router } from 'express'
import { avaliacaoController } from '../controllers/avaliacaoController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, avaliacaoController.createAvaliacao)
router.get('/', verifyToken, avaliacaoController.getAllAvaliacoes)
router.get('/:id', verifyToken, avaliacaoController.getAvaliacaoById)
router.put('/:id', verifyToken, avaliacaoController.updateAvaliacao)
router.delete('/:id', verifyToken, avaliacaoController.deleteAvaliacao)

export default router
