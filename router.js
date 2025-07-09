import express from 'express'
import { getAllObjects, getRiddlesByLevel } from './controllers/riddleController.js'

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

export default router;