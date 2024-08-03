import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import PlanejamentoMensalCategoriasController from '../controllers/PlanejamentoMensalCategoriasController';

const router = Router();

router.post('/', loginRequired, PlanejamentoMensalCategoriasController.create);
router.get('/:planejamento_mensal_id', loginRequired, PlanejamentoMensalCategoriasController.index);
router.delete('/:id', loginRequired, PlanejamentoMensalCategoriasController.delete);
router.put('/:id', loginRequired, PlanejamentoMensalCategoriasController.update);

export default router;
