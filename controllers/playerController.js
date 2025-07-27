import { getAllPlayersDal, getPlayerByNameDal, updatePlayerDal, deletePlayerDal, getPlayerByIdDal } from "../DB/playerDB.js";
import bcrypt from 'bcrypt'

export async function getPlayerByName(req, res) {
    try {
        const name = req.params.name;
        const data = await getPlayerByNameDal(name);
        if (data) {
            res.send(data);
        }
        else {
            res.send(`Faild to Get Player '${name}'`)
        }
    } catch (err) {
        res.send(`Error to get players by name: ${err.message}`)
    }
}

export async function getPlayerById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = await getPlayerByIdDal(id);
        if (data) res.send(data);
        res.send('Faild to get players by id: ', + id);

    } catch (err) { res.send(`Error to get players by id: ${err.message}`) }
}

export async function getAllPlayers(req, res) {
    try {
        const data = await getAllPlayersDal();
        if (!data) return 'Failed to get data';
        res.send(data);
    } catch (err) {
        res.send(`Error to get players: ${err.message}`)
    }
}

export async function updatePlayer(req, res) {
    try {
        const body = req.body;
        const id = parseInt(req.params.id);
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 12);
        }
        const data = await updatePlayerDal(id, body);
        res.send(data);
    } catch (err) {
        res.send("Error with update player (id must be a number): " + err.message)
    }
}

export async function deletePlayer(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = await deletePlayerDal(id);
        if (data) res.send(data);
        res.send("Failed to Delete Player");
    } catch (err) {
        res.send("Error with delete player: " + err.message);
    }
}