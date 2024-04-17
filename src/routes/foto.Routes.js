import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import FotoController from '../controllers/FotoController';

const router = new Router();

router.post('/', loginRequired, FotoController.create);

export default router;
