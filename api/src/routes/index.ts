import { Router } from 'express'

import usuarioRoutes from './usuarioRoutes'

const router = Router();

router.use('/usuario', usuarioRoutes)

export default router;