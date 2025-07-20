import express from 'express';
import * as PC from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.get('/:name', PC.getPlayerByName);
playerRouter.get('/', PC.getAllPlayers);
playerRouter.post('/', PC.createPlayer);
playerRouter.put('/:id', PC.updatePlayer);

export default playerRouter;
