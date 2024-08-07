import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import DepositosMetasFinanceirasController from '../controllers/DepositosMetasFinanceirasController.js';

const router = new Router();

router.post('/', loginRequired, DepositosMetasFinanceirasController.create);
router.get('/:meta_id', loginRequired, DepositosMetasFinanceirasController.index);
router.delete('/:id/:meta_id', loginRequired, DepositosMetasFinanceirasController.delete);

export default router;
