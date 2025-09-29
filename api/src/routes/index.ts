import { Router } from 'express';

import acomodacoesAPI from './acomodacoesAPIRoutes';
import usuarioRoutes from './usuarioRoutes';
import voosRoutes from './voosRoutes';

const router = Router();

router.use('/usuario', usuarioRoutes)
router.use('/voos', voosRoutes)
router.use('/acomodacoesAPI', acomodacoesAPI)

export default router;