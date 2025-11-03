import { Router } from 'express'
import { acomodacaoController } from '../controllers/acomodacaoController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, acomodacaoController.createAcomodacao)
router.get('/viagem/:id', verifyToken, acomodacaoController.getAllAcomodacoesByViagemId)
router.get('/:id', verifyToken, acomodacaoController.getAcomodacaoById)
router.put('/:id', verifyToken, acomodacaoController.updateAcomodacao)
router.delete('/:id', verifyToken, acomodacaoController.deleteAcomodacao)

export default router
