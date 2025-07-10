import express from 'express'
import { getAllPlayers, updateById, createPlayer, deleteById, getPlayerByName } from '../controllers/playerController.js'

const playerRouter = express.Router()

playerRouter.get('/:name', async (req, res) => {
    const id = req.params.name;
    const data = await getPlayerByName(id);
    res.send(data);
})

playerRouter.get('/', async (req, res) => {
    const data = await getAllPlayers();
    res.send(data)
})

playerRouter.put('/:id', async (req, res) => {
    const body = req.body;
    const id = parseInt(req.params.id);
    const msg = await updateById(id, body);
    res.json({ message: msg })
})

playerRouter.post('/', async (req, res) => {
    const body = req.body;
    const msg = await createPlayer(body);
    res.json({ message: msg })
})

playerRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const msg = await deleteById(id);
    res.json({ message: msg })
})

export default playerRouter;