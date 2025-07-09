import express from 'express'
import { getAllObjects, getRiddlesByLevel, updateById, createRiddle, deleteById } from './controllers/riddleController.js'

const router = express.Router()

router.get('/riddles', async (req, res) => {
    const data = await getAllObjects();
    res.json(data)
})

router.get('/riddleByLevel/:level', async (req, res) => {
    const level = req.params.level;
    const riddlesByLevel = await getRiddlesByLevel(level);
    res.json(riddlesByLevel)
})

router.put('/riddle/:id', async (req, res) => {
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

router.post('/riddle', async (req, res) => {
    const body = req.body;
    createRiddle(body);
    res.json({ msg: `riidle '${body.taskDescription}' added succesfuly.` })
})

router.delete('/riddle/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await deleteById(id);
   if (success) {
        res.json({ msg: `riddle with id: ${id} deleted succesfuly` })
    }
    else{
        res.json({msg: `Error with delete id: ${id}`})
    }
})

export default router;