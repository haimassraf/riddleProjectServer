import express from 'express'
import { getAllObjects, getRiddlesByLevel, updateById, createRiddle, deleteById } from '../controllers/riddleController.js'

const riddleRouter = express.Router()

riddleRouter.get('/', async (req, res) => {
    const data = await getAllObjects();
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
    const success = await updateById(id, body);
    if (success) {
        res.json({ msg: `riddle with id: ${id} updated succesfuly` })
    }
    else{
        res.json({msg: `Error with update id: ${id}`})
    }
})

riddleRouter.post('/', async (req, res) => {
    const body = req.body;
    createRiddle(body);
    res.json({ msg: `riidle '${body.taskDescription}' added succesfuly.` })
})

riddleRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await deleteById(id);
   if (success) {
        res.json({ msg: `riddle with id: ${id} deleted succesfuly` })
    }
    else{
        res.json({msg: `Error with delete id: ${id}`})
    }
})

export default riddleRouter;