import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import UserConfigController from '../controllers/UserConfigController.js';

const router = new Router();
// Rota de criação de configuração
router.post('/', loginRequired, UserConfigController.create);
router.get('/:user_id', loginRequired, UserConfigController.show);
router.put('/:id', loginRequired, UserConfigController.update);
router.delete('/:id', loginRequired, UserConfigController.delete);

export default router;
