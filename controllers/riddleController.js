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
    if (!data){
        return 'Faild to get data'
    }

    if (data.length === 0) {
        newData["id"] = 1;
    } else {
        const allId = data.map(el => el["id"]);
        const highestId = Math.max(...allId);
        newData["id"] = highestId + 1;
    }

    data.push(newData);
    const success = await setRiddle(data);
    if (success) {
        return (`new data: ${newData.name} insert succesfully.`);
    }
}

export async function getRiddlesByLevel(level) {
    const data = await getRiddle();
    if (!data){
        return 'Faild to get data';
    }
    const allDataByLevel = data.filter((riddle) => riddle.difficulty === level);
    return allDataByLevel;
}

export async function updateById(id, newData) {
    const data = await getRiddle();
    if (!data){
        return 'Faild to get data';
    }
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

    const success = await setRiddle(data);
    if (success) {
        return (`Object with id ${id} updated successfully.`);
    }
}

export async function deleteById(id) {
    const data = await getRiddle();
    if (!data){
        return 'Faild to get data';
    }
    const i = data.findIndex(obj => obj.id === id);

    if (i === -1) {
        return (`Id ${id} not found`);
    }

    data.splice(i, 1);
    const success = await setRiddle(data);
    if (success) {
        return (`Object with id ${id} removed successfully.`);
    }
}
