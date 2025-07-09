import express from 'express'
import { getRiddlesByLevel, updateById, createRiddle, deleteById, getAllRiddles } from '../controllers/riddleController.js'

const riddleRouter = express.Router()

riddleRouter.get('/', async (req, res) => {
    const data = await getAllRiddles();
    res.json(data)
})

riddleRouter.get('/riddleByLevel/:level', async (req, res) => {
    const level = req.params.level;
    const riddlesByLevel = await getRiddlesByLevel(level);
    res.json(riddlesByLevel)
})

riddleRouter.put('/:id', async (req, res) => {
    const body = req.body;
    const id = parseInt(req.params.id);
    const msg = await updateById(id, body);
    res.json({ message: msg })
})

riddleRouter.post('/', async (req, res) => {
    const body = req.body;
    const msg = createRiddle(body);
    res.json({ message: msg })
})

riddleRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const msg = await deleteById(id);
    res.json({ message: msg })
})

export default riddleRouter;