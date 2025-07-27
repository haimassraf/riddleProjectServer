import express from 'express';
import * as RC from '../controllers/riddleController.js';
import { authMiddleware } from '../auth/authMiddleware.js';

const riddleRouter = express.Router();

riddleRouter.get('/', RC.getAllRiddles);
riddleRouter.get('/riddleByLevel/:level', RC.getRiddlesByLevel);
riddleRouter.put('/:id', authMiddleware('admin'), RC.updateRiddleById);
riddleRouter.post('/', authMiddleware(), RC.createRiddle);
riddleRouter.post('/load-initial-riddles', authMiddleware(), RC.loadInitialRiddles)
riddleRouter.delete('/:id', authMiddleware('admin'), RC.deleteRiddleById);

export default riddleRouter;
