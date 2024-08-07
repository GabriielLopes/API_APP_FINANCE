import { Router } from 'express';
import FotoController from '../controllers/FotoController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.post('/', loginRequired, FotoController.create);
router.get('/:user_id', loginRequired, FotoController.show);

export default router;
