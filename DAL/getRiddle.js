import { promises as fs } from 'node:fs';
// const riddlesJsonPath = "C:\\Users\\Studies\\kodcode\\kodCodeIdf\\RidderProject\\server\\DB\\riddles.json";
const riddlesJsonPath = process.cwd()+ '\\DB\\riddles.json'

export async function getRiddle() {
    try {
        const file = await fs.readFile(riddlesJsonPath, "utf8");
        return file;
    } catch (err) {
        console.log("Error: ", err.message)
    }
}

export async function setRiddle(newData) {
    try {
        await fs.writeFile(riddlesJsonPath, newData);
    } catch (err) {
        console.log("Error: ", err.message)
    }
}