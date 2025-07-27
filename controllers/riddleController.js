import { getAll, insertData, getRiddlesByLevelDal, updateByIdDal, deleteByIdDal } from '../DB/riddleDB.js';

export async function getAllRiddles(req, res) {
    try {
        const allRiddles = await getAll();
        res.send(allRiddles);
    } catch (err) {
        res.send("Error with get all riddles: " + err.message)
    }
}

export async function getRiddlesByLevel(req, res) {
    try {
        const level = req.params.level;
        const riddlesByLevel = await getRiddlesByLevelDal(level);
        if (!riddlesByLevel) { throw new Error('Failed to get data') }
        res.send(riddlesByLevel);
    } catch (err) {
        res.send("Error with get riddles by level: " + err.message)
    }
}

export async function updateRiddleById(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await updateByIdDal(id, body);
        if (!data) {
            throw new Error(`Failed to update object with id: '${id}'`);
        }
        res.send(`Object with id '${id}' updated successfully.`);
    } catch (err) {
        res.send("Error with update riddle: " + err.message)
    }
}

export async function createRiddle(req, res) {
    try {
        const newData = req.body;
        if (!newData.name || !newData.taskDescription || !newData.correctAnswer || !newData.difficulty) {
            throw new Error("new object has missing keys");
        }
        const insertedId = await insertData(newData);
        if (insertedId) {
            res.send(`new data: '${newData.name}', id: '${insertedId}' insert succesfully.`);
        }
        throw new Error("Failed to create data");
    } catch (err) {
        res.send("Error with create riddle: " + err.message)
    }
}

export async function deleteRiddleById(req, res) {
    try {
        const id = req.params.id;
        const data = await deleteByIdDal(id);
        if (!data) {
            throw new Error(`Failed to delete object with id '${id}'`);
        }
        res.send(`Object with id '${id}' deleted successfully.`)
    } catch (err) {
        res.send("Error with delete riddle: " + err.message)
    }
}

export async function loadInitialRiddles(req, res) {
    try {
        const body = req.body;
        const totalMsg = []
        for (const obj of body) {
            const msg = await insertData(obj);
            totalMsg.push(msg || 'Failed to insert data');
        }
        res.send(totalMsg);
    } catch (err) {
        console.log("Error with insert initial riddles")
    }
}