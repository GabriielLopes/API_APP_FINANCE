import { Router } from "express";
import CartoesController from "../controllers/CartoesController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = Router();

router.get('/:user_id', loginRequired, CartoesController.index);
router.post('/', loginRequired, CartoesController.create);
router.put('/:id', loginRequired, CartoesController.update);
router.delete('/:id', loginRequired, CartoesController.delete);