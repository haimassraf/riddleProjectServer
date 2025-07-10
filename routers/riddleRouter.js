import express from 'express';
import * as riddleController from '../controllers/riddleController.js';

const riddleRouter = express.Router();

riddleRouter.get('/', riddleController.getAllRiddlesController);
riddleRouter.get('/riddleByLevel/:level', riddleController.getRiddlesByLevelController);
riddleRouter.put('/:id', riddleController.updateRiddleByIdController);
riddleRouter.post('/', riddleController.createRiddleController);
riddleRouter.delete('/:id', riddleController.deleteRiddleByIdController);

export default riddleRouter;
