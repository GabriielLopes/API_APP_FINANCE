import { Router } from 'express';
import TransacoesController from '../controllers/TransacoesController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.post('/', loginRequired, TransacoesController.create);
router.get('/all/:idConta', loginRequired, TransacoesController.index);
router.get('/:id', loginRequired, TransacoesController.show);
router.delete('/deletar/:id/:idConta', loginRequired, TransacoesController.delete);
router.get('/:idConta/:descricao', loginRequired, TransacoesController.find);

export default router;
