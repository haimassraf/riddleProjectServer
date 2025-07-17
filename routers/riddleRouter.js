import express from 'express';
import * as RC from '../controllers/riddleController.js';

const riddleRouter = express.Router();

riddleRouter.get('/', RC.getAllRiddlesController);
riddleRouter.get('/riddleByLevel/:level', RC.getRiddlesByLevelController);
riddleRouter.put('/:id', RC.updateRiddleByIdController);
riddleRouter.post('/', RC.createRiddleController);
riddleRouter.post('/load-initial-riddles', RC.loadInitialRiddlesController)
riddleRouter.delete('/:id', RC.deleteRiddleByIdController);

export default riddleRouter;
