import { getPlayer, setPlayer } from "../DAL/getPlayer.js";

export async function createPlayer(newPlayer) {
    if (!newPlayer.name) {
        return ("new player has no name");
    }
    const file = await getPlayer();
    const data = JSON.parse(file);

    const existsName = data.some(obj => obj.name === newPlayer.name);
    if (existsName) {
        return "The name already in use";
    }

    newPlayer.id = data.length === 0 ? 1 : Math.max(...data.map(el => el.id)) + 1;

    const updatedData = [...data, newPlayer];
    const success = await setPlayer(updatedData);

    if (success) {
        return (`new player: '${newPlayer.name}' inserted successfully.`);
    }
}

export async function read() {
    const file = await getPlayer();
    const data = JSON.parse(file);
    console.log("All players:");
    console.log(data);
}

export async function getAllPlayers() {
    const file = await getPlayer();
    return JSON.parse(file);
}

export async function updateById(id, updatedPlayer) {
    const file = await getPlayer();
    const data = JSON.parse(file);

    const index = data.findIndex(obj => obj.id === id);
    if (index === -1) {
        console.error(`Player with id ${id} not found`);
    }

    const nameInUse = data.some(
        obj => obj.name === updatedPlayer.name && obj.id !== id
    );
    if (updatedPlayer.name && nameInUse) {
        console.error("The name is already in use");
    }

    data[index].name = updatedPlayer.name || data[index].name;
    data[index].highestScore = updatedPlayer.highestScore || data[index].highestScore;

    const success = await setPlayer(data);
    if (success) {
        console.log(`Player with id ${id} updated successfully.`);
    }
}

export async function deleteById(id) {
    const file = await getPlayer();
    const data = JSON.parse(file);

    const index = data.findIndex(obj => obj.id === id);
    if (index === -1) {
        console.error(`Player with id ${id} not found`);
    }

    data.splice(index, 1);

    const success = await setPlayer(data);
    if (success) {
        console.log(`Player with id ${id} removed successfully.`);
    }
}
