import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'search_history.json');

const _read = async () => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Read Failed: ${error.message}`);
    }
};

const _write = async (history) => {
    //to do
};

export const insert = async (keyword) => {
    //to do
};

export const find = async () => {
    //to do
};