import { getAllPlayers, getPlayerByNameDal, createPlayerDal } from "../DAL/playerDAL.js";

export async function getAllPlayersController(req, res) {
    try {
        const data = await getAllPlayers();
        if (!data) return 'Faild to get data';
        res.send(data);
    } catch (err) {
        res.send(`Error to get players: ${err.message}`)
    }
}

export async function getPlayerByNameController(req, res) {
    try {
        const name = req.params.name;
        const data = await getPlayerByNameDal(name);
        res.send(data);
    } catch (err) {
        res.send(`Error to get players by name: ${err.message}`)
    }
}

export async function createPlayerController(req, res) {
    try {
        const body = req.body;
        if (!body.name) {
            throw new Error("new player has no name")
        }
        const data = await createPlayerDal(body);
        res.send(data)
    } catch (err) {
        res.send(`Error to create player: ${err.message}`)
    }
}
