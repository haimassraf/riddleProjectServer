import express from 'express';
import * as RC from '../controllers/riddleController.js';
import { authMiddleware } from '../auth/authMiddleware.js';
import { adminAuthMiddleware } from '../auth/adminAuthMiddleWare.js';

const riddleRouter = express.Router();

riddleRouter.get('/', authMiddleware, RC.getAllRiddles);
riddleRouter.get('/riddleByLevel/:level', RC.getRiddlesByLevel);
riddleRouter.put('/:id', adminAuthMiddleware, RC.updateRiddleById);
riddleRouter.post('/', authMiddleware, RC.createRiddle);
riddleRouter.post('/load-initial-riddles', authMiddleware, RC.loadInitialRiddles)
riddleRouter.delete('/:id', adminAuthMiddleware, RC.deleteRiddleById);

export default riddleRouter;
