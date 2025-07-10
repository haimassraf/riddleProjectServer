import * as playerService from '../services/playerService.js';

export async function getAllPlayersController(req, res) {
    const data = await playerService.getAllPlayers();
    res.send(data);
}

export async function getPlayerByNameController(req, res) {
    const name = req.params.name;
    const data = await playerService.getPlayerByName(name);
    res.send(data);
}

export async function updatePlayerByIdController(req, res) {
    const id = parseInt(req.params.id);
    const body = req.body;
    const msg = await playerService.updateById(id, body);
    res.json({ message: msg });
}

export async function createPlayerController(req, res) {
    const body = req.body;
    const msg = await playerService.createPlayer(body);
    res.json({ message: msg });
}

export async function deletePlayerByIdController(req, res) {
    const id = parseInt(req.params.id);
    const msg = await playerService.deleteById(id);
    res.json({ message: msg });
}
