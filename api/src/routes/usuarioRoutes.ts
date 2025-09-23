import { Router } from 'express'
import { usuarioController } from '../controllers/usuarioController'

const routes = Router()

routes.use('/', usuarioController.getAllUsers)

export default routes