import { Router } from 'express';
import homeController from '../controllers/Home.Controller';

const router = new Router();

router.get('/', homeController.index);

export default router;

/*
 index -> lista todos os usuários -> GET
 store/create -> cria um novo usuário -> POST
 delete -> apaga um usuário -> DELETE
 show -> mostra um usuário -> GET
 update -> atualiza um usuário -> PATCH o PUT
 */
