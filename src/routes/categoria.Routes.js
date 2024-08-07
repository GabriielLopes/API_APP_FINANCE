import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', loginRequired, CategoriaController.index); // Visualizar todas as categorias
router.post('/', loginRequired, CategoriaController.create); // Criar categorias
router.get('/:id', loginRequired, CategoriaController.show); // Visualizar apenas uma categoria
router.put('/:id', loginRequired, CategoriaController.update); // atualizar categoria
router.delete('/:id', loginRequired, CategoriaController.delete); // Exclui uma categoria

export default router;
