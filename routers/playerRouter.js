import express from 'express'
import { getAllPlayers, updateById, createPlayer, deleteById } from '../controllers/playerController.js'

const playerRouter = express.Router()

playerRouter.get('/', async (req, res) => {
    const data = await getAllPlayers();
    res.json(data)
})

playerRouter.put('/:id', async (req, res) => {
    const body = req.body;
    const id = parseInt(req.params.id);
    const success = await updateById(id, body);
    if (success) {
        res.json({ msg: `riddle with id: ${id} updated succesfuly` })
    }
    else {
        res.json({ msg: `Error with update id: ${id}` })
    }
})

playerRouter.post('/', async (req, res) => {
    const body = req.body;
    const msg = await createPlayer(body);
    res.json({ message: msg })
})

playerRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await deleteById(id);
    if (success) {
        res.json({ msg: `riddle with id: ${id} deleted succesfuly` })
    }
    else {
        res.json({ msg: `Error with delete id: ${id}` })
    }
})

export default playerRouter;