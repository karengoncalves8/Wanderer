import { Router } from 'express'
import { listaItemController } from '../controllers/listaItemController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', verifyToken, listaItemController.createListaItem)
router.get('/', verifyToken, listaItemController.getAllListaItems)
router.get('/:id', verifyToken, listaItemController.getListaItemById)
router.put('/:id', verifyToken, listaItemController.updateListaItem)
router.delete('/:id', verifyToken, listaItemController.deleteListaItem)

export default router
