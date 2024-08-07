import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import ContaController from '../controllers/ContaController.js';

const router = new Router();

router.post('/', loginRequired, ContaController.create); // Cria uma conta para o usuario logado
router.get('/index/:idUser', loginRequired, ContaController.index); // Visualiza todas as contas do usuario logado
router.get('/:id', loginRequired, ContaController.show); // Visualiza apenas uma conta
router.put('/:id', loginRequired, ContaController.update); // Atualiza apenas uma conta por vez
export default router;
