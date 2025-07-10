import { getPlayer, setPlayer } from "../DAL/getPlayer.js";

export async function getPlayerByName(name) {
    const data = await getPlayer();
    if (!data) {
        return 'Faild to get data';
    }
    const i = data.findIndex(obj => obj.name === name);
    if (i === -1) {
        return (`Player with name '${name}' not found`);
    }
    return data[i];
}

export async function createPlayer(newPlayer) {
    if (!newPlayer.name) {
        return ("new player has no name");
    }
    const data = await getPlayer();
    if (!data) {
        return 'Faild to get data';
    }

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

export async function getAllPlayers() {
    const data = await getPlayer();
    if (!data) {
        return 'Faild to get data';
    }
    return data;
}

export async function updateById(id, updatedPlayer) {
    const data = await getPlayer();
    if (!data) {
        return 'Faild to get data';
    }

    const i = data.findIndex(obj => obj.id === id);
    if (i === -1) {
        return (`Player with id ${id} not found`);
    }

    const nameInUse = data.some(
        obj => obj.name === updatedPlayer.name && obj.id !== id
    );
    if (updatedPlayer.name && nameInUse) {
        return ("The name is already in use");
    }

    data[i].name = updatedPlayer.name || data[i].name;
    data[i].highScore = parseFloat(updatedPlayer.highScore) || data[i].highScore;

    const success = await setPlayer(data);
    if (success) {
        return (`Player with id ${id} updated successfully.`);
    }
}

export async function deleteById(id) {
    const data = await getPlayer();
    if (!data) {
        return 'Faild to get data';
    }

    const index = data.findIndex(obj => obj.id === id);
    if (index === -1) {
        return (`Player with id ${id} not found`);
    }

    data.splice(index, 1);

    const success = await setPlayer(data);
    if (success) {
        return (`Player with id ${id} removed successfully.`);
    }
}
