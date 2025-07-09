import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// יצירת __dirname בסביבת ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// בניית נתיב מוחלט לקובץ riddles.json
const riddlesJsonPath = path.resolve(__dirname, '../DB/riddles.json');

export async function getRiddle() {
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
