import { promises as fs } from 'node:fs';

const playersJsonPath = "C:\\Users\\Studies\\kodcode\\kodCodeIdf\\RidderProject\\server\\DB\\players.json";

export async function createPlayer(newPlayer) {
    try {
        if (!newPlayer.name) {
            throw new Error("new player has no name")
        }
        const file = await fs.readFile(playersJsonPath, "utf8");
        const data = JSON.parse(file);
        const existsName = data.some(obj => obj.name === newPlayer.name);
        if (existsName) {
            throw new Error("The name already in used")
        }
        if (data.length === 0) {
            newPlayer["id"] = 1;
        } else {
            const allId = data.map(el => el["id"]);
            const highestId = Math.max(...allId);
            newPlayer["id"] = highestId + 1;
        }
        data.push(newPlayer);
        await fs.writeFile(playersJsonPath, JSON.stringify(data));
        console.log(`new player: ${newPlayer.name}\ninsert succesfully.`);
    } catch (err) {
        console.log("Error:", err.message);
    }
}

export async function read() {
    try {
        const file = await fs.readFile(playersJsonPath, "utf8");
        const data = JSON.parse(file);
        console.log("All players:");
        console.log(data);
    } catch (err) {
        console.log("Error:", err.message);
    }
}

export async function getAllPlayers() {
    try {
        const file = await fs.readFile(playersJsonPath, "utf8");
        return JSON.parse(file);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

export async function updateById(id, updatedPlayer) {
    try {
        const data = await getAllPlayers();
        const i = data.findIndex(obj => obj.id === id);

        const existsName = data.some(obj => obj.name === updatedPlayer.name);
        if (existsName) {
            throw new Error("The name already use")
        }
        if (i === -1) {
            throw new Error(`Player with id ${id} not found`);
        }

        data[i].name = updatedPlayer.name ? updatedPlayer.name : data[i].name;
        data[i].highestScore = updatedPlayer.highestScore ? updatedPlayer.highestScore : data[i].highestScore;

        await fs.writeFile(playersJsonPath, JSON.stringify(data));
        console.log(`Player with id ${id} updated successfully.`);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

export async function deleteById(id) {
    try {
        const data = await getAllPlayers();
        const i = data.findIndex(obj => obj.id === id);

        if (i === -1) {
            throw new Error(`Player with id ${id} not found`);
        }

        data.splice(i, 1);
        await fs.writeFile(playersJsonPath, JSON.stringify(data));
        console.log(`Player with id ${id} removed successfully.`);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}
