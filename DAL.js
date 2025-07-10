import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDBPath(fileName) {
    return path.join(__dirname, '..', 'server', 'DB', `${fileName}.json`);
}

export async function getAll(fileName) {
    try {
        const dbPath = getDBPath(fileName);
        const file = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(file);
    } catch (err) {
        console.log('Error in getAll:', err.message);
        return null;
    }
}

export async function setAll(fileName, newData) {
    try {
        const dbPath = getDBPath(fileName);
        const file = JSON.stringify(newData, null, 2);
        await fs.writeFile(dbPath, file, 'utf8');
        return true;
    } catch (err) {
        console.log('Error in setAll:', err.message);
        return false;
    }
}
