import express from 'express';
import * as playerController from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.get('/:name', playerController.getPlayerByNameController);
playerRouter.get('/', playerController.getAllPlayersController);
playerRouter.put('/:id', playerController.updatePlayerByIdController);
playerRouter.post('/', playerController.createPlayerController);
playerRouter.delete('/:id', playerController.deletePlayerByIdController);

export default playerRouter;
