import express from 'express';
import * as PC from '../controllers/playerController.js';
import { adminAuthMiddleware } from '../auth/adminAuthMiddleWare.js';

const playerRouter = express.Router();

playerRouter.get('/:name', adminAuthMiddleware, PC.getPlayerByName);
playerRouter.get('/', adminAuthMiddleware, PC.getAllPlayers);
playerRouter.put('/:id', adminAuthMiddleware, PC.updatePlayer);
playerRouter.delete('/:id', adminAuthMiddleware, PC.deletePlayer);

export default playerRouter;
