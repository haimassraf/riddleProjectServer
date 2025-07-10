import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const playersJsonPath = path.join(__dirname, '..', 'DB', 'players.json');

export async function getPlayer() {
    try {
        const file = await fs.readFile(playersJsonPath, 'utf8');
        return JSON.parse(file);
    } catch (err) {
        console.log('Error:', err.message);
    }
}

export async function setPlayer(newData) {
    try {
        const file = JSON.stringify(newData);
        await fs.writeFile(playersJsonPath, file);
        return true;
    } catch (err) {
        console.log('Error:', err.message);
    }
}
