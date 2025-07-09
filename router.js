import express from 'express'
import { getAllObjects, getRiddlesByLevel, updateById } from './controllers/riddleController.js'

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
    updateById(id, body);
    res.json({ msg: `riddle with id: ${id} update succesfuly` })
})

router.post('/riddle', async (req, res) =>{
    const body = req.body;
    
})

export default router;