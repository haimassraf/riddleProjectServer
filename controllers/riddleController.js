import * as riddleService from '../services/riddleService.js'

export async function getAllRiddlesController(req, res) {
    const data = await riddleService.getAllRiddles();
    res.send(data);
}

export async function getRiddlesByLevelController(req, res) {
    const level = req.params.level;
    const riddlesByLevel = await riddleService.getRiddlesByLevel(level);
    res.send(riddlesByLevel);
}

export async function updateRiddleByIdController(req, res) {
    const id = req.params.id;
    const body = req.body;
    const msg = await riddleService.updateById(id, body);
    res.json({ message: msg });
}

export async function createRiddleController(req, res) {
    const body = req.body;
    const msg = await riddleService.createRiddle(body);
    res.json({ message: msg });
}

export async function deleteRiddleByIdController(req, res) {
    const id = req.params.id;
    const msg = await riddleService.deleteById(id);
    res.json({ message: msg });
}

export async function loadInitialRiddlesController(req, res) {
    const body = req.body;
    const totalMsg = []
    for (const obj of body) {
        const msg = await riddleService.createRiddle(obj);
        totalMsg.push(msg);
    }
    res.send(totalMsg);
}