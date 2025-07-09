import { getRiddle, setRiddle } from '../DAL/getRiddle.js';

export async function createRiddle(newData) {
    if (!newData.name || !newData.taskDescription || !newData.correctAnswer || !newData.difficulty) {
        console.log("Error: new object has missing keys");
        return;
    }

    const file = await getRiddle();
    const data = JSON.parse(file);

    if (data.length === 0) {
        newData["id"] = 1;
    } else {
        const allId = data.map(el => el["id"]);
        const highestId = Math.max(...allId);
        newData["id"] = highestId + 1;
    }

    data.push(newData);
    setRiddle(JSON.stringify(data));
    console.log(`new data: ${newData.taskDescription} insert succesfully.`);
}

export async function readAllRiddles() {
    const file = await getRiddle();
    const data = JSON.parse(file);
    console.log("All Riddles:");
    console.log(data);
}

export async function getAllObjects() {
    const file = await getRiddle();
    return JSON.parse(file);
}

export async function getRiddlesByLevel(level) {
    const data = await getAllObjects();
    const allDataByLevel = data.filter((riddle) => riddle.difficulty === level);
    return allDataByLevel;
}

export async function updateById(id, newData) {
    const data = await getAllObjects();
    const i = data.findIndex(obj => obj.id === id);

    if (i === -1) {
        console.log(`Error: Id ${id} not found`);
        return false;
    }

    data[i].name = newData.name || data[i].name;
    data[i].taskDescription = newData.taskDescription || data[i].taskDescription;
    data[i].correctAnswer = newData.correctAnswer || data[i].correctAnswer;
    data[i].difficulty = newData.difficulty || data[i].difficulty;
    data[i].choices = newData.choices || data[i].choices;
    data[i].hint = newData.hint || data[i].hint;
    data[i].timeLimit = newData.timeLimit || data[i].timeLimit;

    setRiddle(JSON.stringify(data));
    console.log(`Object with id ${id} updated successfully.`);
    return true;
}

export async function deleteById(id) {
    const data = await getAllObjects();
    const i = data.findIndex(obj => obj.id === id);

    if (i === -1) {
        console.log(`Error: Id ${id} not found`);
        return false;
    }

    data.splice(i, 1);
    setRiddle(JSON.stringify(data));
    console.log(`Object with id ${id} removed successfully.`);
    return true;
}
