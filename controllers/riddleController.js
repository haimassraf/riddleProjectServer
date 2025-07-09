import { getRiddle, setRiddle } from '../DAL/getRiddle.js';

export async function getAllRiddles() {
    const allRiddles = await getRiddle();
    return allRiddles;
}

export async function createRiddle(newData) {
    if (!newData.name || !newData.taskDescription || !newData.correctAnswer || !newData.difficulty) {
        return ("new object has missing keys");
    }

    const data = await getRiddle();

    if (data.length === 0) {
        newData["id"] = 1;
    } else {
        const allId = data.map(el => el["id"]);
        const highestId = Math.max(...allId);
        newData["id"] = highestId + 1;
    }

    data.push(newData);
    setRiddle(JSON.stringify(data));
    return (`new data: ${newData.name} insert succesfully.`);
}

export async function getRiddlesByLevel(level) {
    const data = await getRiddle();
    const allDataByLevel = data.filter((riddle) => riddle.difficulty === level);
    return allDataByLevel;
}

export async function updateById(id, newData) {
    const data = await getRiddle();
    const i = data.findIndex(obj => obj.id === id);

    if (i === -1) {
        return (`Id ${id} not found`);
    }

    data[i].name = newData.name || data[i].name;
    data[i].taskDescription = newData.taskDescription || data[i].taskDescription;
    data[i].correctAnswer = newData.correctAnswer || data[i].correctAnswer;
    data[i].difficulty = newData.difficulty || data[i].difficulty;
    data[i].choices = newData.choices || data[i].choices;
    data[i].hint = newData.hint || data[i].hint;
    data[i].timeLimit = newData.timeLimit || data[i].timeLimit;

    setRiddle(JSON.stringify(data));
    return (`Object with id ${id} updated successfully.`);
}

export async function deleteById(id) {
    const data = await getRiddle();
    const i = data.findIndex(obj => obj.id === id);

    if (i === -1) {
        return (`Id ${id} not found`);
    }

    data.splice(i, 1);
    setRiddle(JSON.stringify(data));
    return (`Object with id ${id} removed successfully.`);
}
