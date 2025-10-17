import fs from 'fs/promises';
import path from "path"

export const readJSON = async (collectionName) => {
    const fullPath = path.join("database", `${collectionName}.json`);
    try {
        const dataString = await fs.readFile(fullPath, "utf-8");
        return JSON.parse(dataString);
    } catch (error) {
        console.error(error);
        return error
    }
}

export const writeJSON = async (collectionName, data) => {
    const fullPath = path.join("src/database", `${collectionName}.json`);
    try {
        let currentData = [];
        const dataString = await fs.readFile(fullPath, "utf-8");
        currentData = JSON.parse(dataString);

        if(!Array.isArray(currentData)) {
            console.warn('Existing file is not an array. Overwriting with new array.');
            currentData = [];
        }
        currentData.push(data);
        const updateString = JSON.stringify(currentData, null, 2);

        await fs.writeFile(fullPath, updateString, "utf-8");
    } catch (error) {
        console.error(error);
        return error;
    }
}