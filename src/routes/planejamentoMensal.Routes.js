import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import PlanejamentoMensalController from '../controllers/PlanejamentoMensalController';

const router = Router();

router.post('/', loginRequired, PlanejamentoMensalController.create);
router.get('/:user_id', loginRequired, PlanejamentoMensalController.index);
router.delete('/:id', loginRequired, PlanejamentoMensalController.delete);
router.put('/:id', loginRequired, PlanejamentoMensalController.update);

export default router;
