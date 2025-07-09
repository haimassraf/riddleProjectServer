import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// הפיכת import.meta.url לנתיב קובץ
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// שימוש ב-path.join או path.resolve - עם '/' בלבד
const riddlesJsonPath = path.join(__dirname, '..', 'DB', 'riddles.json');

export async function getRiddle() {
    console.log("Resolved path to riddles.json:", riddlesJsonPath);
    try {
        const file = await fs.readFile(riddlesJsonPath, 'utf8');
        return file;
    } catch (err) {
        console.log('Error:', err.message);
    }
}

export async function setRiddle(newData) {
    try {
        await fs.writeFile(riddlesJsonPath, newData);
    } catch (err) {
        console.log('Error:', err.message);
    }
}
