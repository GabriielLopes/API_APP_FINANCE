import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import DepositosMetasFinanceirasController from '../controllers/DepositosMetasFinanceirasController';

const router = new Router();

router.post('/', loginRequired, DepositosMetasFinanceirasController.create);
router.get('/:meta_id', loginRequired, DepositosMetasFinanceirasController.index);
router.delete('/:id/:meta_id', loginRequired, DepositosMetasFinanceirasController.delete);

export default router;
