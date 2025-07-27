import express from 'express';
import * as PC from '../controllers/playerController.js';
import { authMiddleware } from '../controllers/auth.js';

const playerRouter = express.Router();

playerRouter.get('/:name', authMiddleware(), PC.getPlayerByName);
playerRouter.get('/', PC.getAllPlayers);
playerRouter.put('/:id', authMiddleware(), PC.updatePlayer);
playerRouter.delete('/:id', authMiddleware('admin'), PC.deletePlayer);
playerRouter.get('/byid/:id', authMiddleware(), PC.getPlayerById);

export default playerRouter;
