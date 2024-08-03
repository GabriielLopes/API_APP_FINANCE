import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import MetasFinanceirasController from '../controllers/MetasFinanceirasController';

const router = new Router();

router.post('/', loginRequired, MetasFinanceirasController.create);
router.get('/:user_id', loginRequired, MetasFinanceirasController.index);
router.delete('/:id', loginRequired, MetasFinanceirasController.delete);
router.put('/:id', loginRequired, MetasFinanceirasController.update);

export default router;
