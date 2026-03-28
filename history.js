import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'search_history.json');

// Function to read the search history from the JSON file
const _read = async () => {
    try {
        // Read the file asynchronously as UTF-8 text
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Read Failed: ${error.message}`);
    }
};

// Function to write the updated search history back to the JSON file
const _write = async (history) => {
    try {
        // Convert the JavaScript object/array to a JSON string with indentation
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(history, null, 2),
            'utf-8'
        );
    } catch (error) {
        throw new Error(`Write Failed: ${error.message}`);
    }
};

// Exported function to insert a new keyword into search history
export const insert = async (keyword) => {
    try {
        // Read current search history
        const history = await _read();

        // Ensure keyword is unique
        const exists = history.some(
            (item) => item.toLowerCase() === keyword.toLowerCase()
        );

        // If keyword is not already in history, add it
        if (!exists) {
            history.push(keyword);
            await _write(history);
        }

        return history;
    } catch (error) {
        throw new Error(`Insert Failed: ${error.message}`);
    }
};

// Retrieve entire search history
export const find = async () => {
    try {
        const history = await _read();
        return history;
    } catch (error) {
        throw new Error(`Find Failed: ${error.message}`);
    }
};