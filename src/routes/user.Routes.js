import { Router } from 'express';
import userController from '../controllers/User.Controller';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Rotas de criação de usuário

// Não deveria existir
// router.get('/', userController.index); // Lista usuários
// router.get('/:id', userController.show); // Lista usuário

router.post('/', userController.create); // Cria usuário
router.put('/', loginRequired, userController.update); // Atualiza usuário -> PUXAR ID PELO TOKEN
router.delete('/', loginRequired, userController.delete); // Deleta usuário -> PUXAR ID PELO TOKEN

export default router;

/*
 index -> lista todos os usuários -> GET
 store/create -> cria um novo usuário -> POST
 delete -> apaga um usuário -> DELETE
 show -> mostra um usuário -> GET
 update -> atualiza um usuário -> PATCH o PUT
 */
