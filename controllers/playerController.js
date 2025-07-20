import { getAllPlayersDal, getPlayerByNameDal, createPlayerDal, updatePlayerDal, deletePlayerDal } from "../DAL/playerDAL.js";

export async function getPlayerByName(req, res) {
    try {
        const name = req.params.name;
        const data = await getPlayerByNameDal(name);
        if (data.length > 0) {
            res.send(data[0]);
        }
        else {
            throw new Error(`Player '${name}' not found`)
        }
    } catch (err) {
        res.send(`Error to get players by name: ${err.message}`)
    }
}

export async function getAllPlayers(req, res) {
    try {
        const data = await getAllPlayersDal();
        if (!data) return 'Faild to get data';
        res.send(data);
    } catch (err) {
        res.send(`Error to get players: ${err.message}`)
    }
}


export async function createPlayer(req, res) {
    try {
        const body = req.body;
        if (!body.name) {
            throw new Error("new player has no name")
        }
        const data = await createPlayerDal(body);
        if (data[0].id) {
            res.send(data[0])
        }
        else {
            res.send(data)
        }
    } catch (err) {
        res.send(`Error to create player: ${err.message}`)
    }
}

export async function updatePlayer(req, res) {
    try {
        const body = req.body;
        const id = parseInt(req.params.id);
        const data = await updatePlayerDal(id, body);
        if (data[0].id) {
            res.send(data[0])
        }else{
            res.send(data)
        }
    } catch (err) {
        res.send("Error with update player (id must be a number): " + err.message)
    }
}

export async function deletePlayer(req, res) {
    try{
        const id = parseInt(req.params.id);
        const data = await deletePlayerDal(id);
        res.send(data);
    }catch(err){
        res.send("Error with delete player: " + err.message);
    }
}