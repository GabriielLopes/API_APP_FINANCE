import Router from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import TransacoesCartaoController from '../controllers/TransacoesCartaoController.js';

const router = new Router();

router.post('/', loginRequired, TransacoesCartaoController.create);
router.get('/:cartao_id', loginRequired, TransacoesCartaoController.index);
router.put('/:id/', loginRequired, TransacoesCartaoController.update);
router.delete('/:id/', loginRequired, TransacoesCartaoController.delete);

export default router;
