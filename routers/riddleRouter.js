import express from 'express';
import * as RC from '../controllers/riddleController.js';

const riddleRouter = express.Router();

riddleRouter.get('/', RC.getAllRiddles);
riddleRouter.get('/riddleByLevel/:level', RC.getRiddlesByLevel);
riddleRouter.put('/:id', RC.updateRiddleById);
riddleRouter.post('/', RC.createRiddle);
riddleRouter.post('/load-initial-riddles', RC.loadInitialRiddles)
riddleRouter.delete('/:id', RC.deleteRiddleById);

export default riddleRouter;
