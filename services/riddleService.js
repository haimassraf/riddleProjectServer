import { getAll, insertData } from '../DAL.js';

export async function getAllRiddles() {
    const allRiddles = await getAll();
    return allRiddles;
}

export async function createRiddle(newData) {
    if (!newData.name || !newData.taskDescription || !newData.correctAnswer || !newData.difficulty) {
        return "new object has missing keys";
    }

    const insertedId = await insertData(newData);
    if (insertedId) {
        return (`new data: '${newData.name}', id: '${insertedId}' insert succesfully.`);
    }
    return "Faild to create data"
}

export async function getRiddlesByLevel(level) {
    const data = await getAll('riddles');
    if (!data) {
        return 'Faild to get data';
    }
    const allDataByLevel = data.filter((riddle) => riddle.difficulty === level);
    return allDataByLevel;
}

export async function updateById(id, newData) {
    const data = await getAll('riddles');
    if (!data) {
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

    const success = await setAll('riddles', data);
    if (success) {
        return (`Object with id ${id} updated successfully.`);
    }
}

export async function deleteById(id) {
    const data = await getAll('riddles');
    if (!data) {
        return 'Faild to get data';
    }
    const i = data.findIndex(obj => obj.id === id);

    if (i === -1) {
        return (`Id ${id} not found`);
    }

    data.splice(i, 1);
    const success = await setAll('riddles', data);
    if (success) {
        return (`Object with id ${id} removed successfully.`);
    }
}
