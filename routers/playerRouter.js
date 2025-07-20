import express from 'express';
import * as playerController from '../controllers/playerController.js';

const playerRouter = express.Router();

playerRouter.get('/:name', playerController.getPlayerByNameController);
playerRouter.get('/', playerController.getAllPlayersController);
playerRouter.post('/', playerController.createPlayerController);

export default playerRouter;
