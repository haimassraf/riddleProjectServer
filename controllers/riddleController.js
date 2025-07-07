import { promises as fs } from 'node:fs';
import { Riddle } from '../../RidderProject/models/riddle.js';
import { MultipleChoiceRiddle } from '../../RidderProject/models/MultipleChoiceRiddle.js';
import { getRiddle } from '../DAL/getRiddle.js';

const riddlesJsonPath = "C:\\Users\\Studies\\kodcode\\kodCodeIdf\\RidderProject\\server\\DB\\riddles.json";

export async function createRiddle(newData) {
    try {
        if (!newData.name || !newData.taskDescription || !newData.correctAnswer || !newData.difficulty) {
            throw new Error("new object has missing keys")
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
        await fs.writeFile(riddlesJsonPath, JSON.stringify(data));
        console.log(`new data: ${newData.name}\ninsert succesfully.`);
    } catch (err) {
        console.log("Error:", err.message);
    }
}

export async function read() {
    try {
        const file = await getRiddle();
        const data = JSON.parse(file);
        console.log("All Riddles:");
        console.log(data);
    } catch (err) {
        console.log("Error:", err);
    }
}

export async function getAllObjects() {
    try {
        const file = await getRiddle();
        return JSON.parse(file);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

export async function getRiddlesByLevel(level) {
    try {
        const data = await getAllObjects();
        const allDataByLevel = data.filter((riddle) => riddle.difficulty === level);
        const allRiddlesByLevel = [];
        let id = 1;
        for (const dataByLevel of allDataByLevel) {
            if (dataByLevel.choices) {
                const newRiddle = new MultipleChoiceRiddle(id, dataByLevel.name, dataByLevel.taskDescription, dataByLevel.correctAnswer, dataByLevel.difficulty, dataByLevel.choices, dataByLevel.hint, dataByLevel.timeLimit);
                allRiddlesByLevel.push(newRiddle);
            }
            else {
                const newRiddle = new Riddle(id, dataByLevel.name, dataByLevel.taskDescription, dataByLevel.correctAnswer, dataByLevel.difficulty, dataByLevel.hint, dataByLevel.timeLimit);
                allRiddlesByLevel.push(newRiddle);
            }
            id++;
        }
        return allRiddlesByLevel;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}

export async function updateById(id, newData) {
    try {
        const data = await getAllObjects();
        const i = data.findIndex(obj => obj.id === id);

        if (i === -1) {
            throw new Error(`Id ${id} not found`);
        }

        data[i].name = newData.name ? newData.name : data[i].name;
        data[i].taskDescription = newData.taskDescription ? newData.taskDescription : data[i].taskDescription;
        data[i].correctAnswer = newData.correctAnswer ? newData.correctAnswer : data[i].correctAnswer;
        data[i].difficulty = newData.difficulty ? newData.difficulty : data[i].difficulty;
        data[i].choices = newData.choices ? newData.choices : data[i].choices;
        data[i].hint = newData.hint ? newData.hint : data[i].hint;
        data[i].timeLimit = newData.timeLimit ? newData.timeLimit : data[i].timeLimit;

        await fs.writeFile(riddlesJsonPath, JSON.stringify(data));
        console.log(`Object with id ${id} updated successfully.`);
    } catch (err) {
        console.log("Error: ", err);
    }
}

export async function deleteById(id) {
    try {
        const data = await getAllObjects();
        const i = data.findIndex(obj => obj.id === id);

        if (i === -1) {
            throw new Error(`Id ${id} not found`);
        }

        data.splice(i, 1);
        await fs.writeFile(riddlesJsonPath, JSON.stringify(data));
        console.log(`Object with id ${id} removed successfully.`);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}
