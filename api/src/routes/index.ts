import { Router } from 'express';

import acomodacoesAPI from './acomodacoesAPIRoutes';
import usuarioRoutes from './usuarioRoutes';
import voosRoutes from './voosRoutes';
import viagemRoutes from './viagemRoutes';
import passagemRoutes from './passagemRoutes';
import acomodacaoRoutes from './acomodacaoRoutes';
import gastosRoutes from './gastosRoutes';
import despesaRoutes from './despesaRoutes';
import despesaCategoriaRoutes from './despesaCategoriaRoutes';
import atividadeRoutes from './atividadeRoutes';
import atividadeCategoriaRoutes from './atividadeCategoriaRoutes';
import listaRoutes from './listaRoutes';
import listaItemRoutes from './listaItemRoutes';
import avaliacaoRoutes from './avaliacaoRoutes';

const router = Router();

router.use('/usuario', usuarioRoutes)
router.use('/voos', voosRoutes)
router.use('/acomodacoesAPI', acomodacoesAPI)
router.use('/viagem', viagemRoutes)
router.use('/passagem', passagemRoutes)
router.use('/acomodacao', acomodacaoRoutes)
router.use('/gastos', gastosRoutes)
router.use('/despesa', despesaRoutes)
router.use('/despesaCategoria', despesaCategoriaRoutes)
router.use('/atividade', atividadeRoutes)
router.use('/atividadeCategoria', atividadeCategoriaRoutes)
router.use('/lista', listaRoutes)
router.use('/listaItem', listaItemRoutes)
router.use('/avaliacao', avaliacaoRoutes)

export default router;