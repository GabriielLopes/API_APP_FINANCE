import { Router } from 'express';
import AlunoController from '../controllers/Aluno.Controller';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, AlunoController.index);
router.post('/', loginRequired, AlunoController.create);
router.put('/:id', loginRequired, AlunoController.update);
router.get('/:id', AlunoController.show);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;
