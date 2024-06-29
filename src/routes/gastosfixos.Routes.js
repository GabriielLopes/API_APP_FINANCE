import { Router } from 'express';
import GastosfixosController from '../controllers/GastosfixosController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, GastosfixosController.create);
router.get('/:conta_id/:user_id', loginRequired, GastosfixosController.index);
router.get('/:id', loginRequired, GastosfixosController.show);
router.put('/:id', loginRequired, GastosfixosController.update);
router.delete('/:id', loginRequired, GastosfixosController.delete);

export default router;
