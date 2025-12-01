import { Router } from 'express'

import { destinosController } from '../controllers/searchDestinations'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

// Rotas protegidas (exige autenticação via JWT)
router.get('/popular', verifyToken, destinosController.searchPopularDestinations)
router.get('/details', verifyToken, destinosController.searchDestinationDetails)
router.get('/nearby', verifyToken, destinosController.searchNearbyAttractions)
router.get('/guide', verifyToken, destinosController.getDestinationGuide)

export default router
