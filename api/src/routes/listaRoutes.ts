import { Router } from 'express'
import { listaController } from '../controllers/listaController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, listaController.createLista)
router.get('/viagem/:id', verifyToken, listaController.getAllListasByViagemId)
router.get('/:id', verifyToken, listaController.getListaById)
router.put('/:id', verifyToken, listaController.updateLista)
router.delete('/:id', verifyToken, listaController.deleteLista)

export default router
