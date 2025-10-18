import fs from 'fs/promises';
import path from "path"

export const readJSON = async (collectionName) => {
    const fullPath = path.join("src/database", `${collectionName}.json`);
    try {
        const dataString = await fs.readFile(fullPath, "utf-8");
        return JSON.parse(dataString);
    } catch (error) {
        console.error(error);
        return error
    }
}

export const writeNewJSON = async (collectionName, data) => {
    const fullPath = path.join("src/database", `${collectionName}.json`);
    try {
        const dataString = JSON.stringify(data, null, 2);

        await fs.writeFile(fullPath, dataString, "utf-8");
    } catch(error) {
        throw new Error(error);
    }
}

export const writeJSON = async (collectionName, data) => {
    const fullPath = path.join("src/database", `${collectionName}.json`);
    try {
        let currentData = [];
        const dataString = await fs.readFile(fullPath, "utf-8");
        currentData = JSON.parse(dataString);

        if (!Array.isArray(currentData)) {
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

export async function findUser(query, collectionName = "users") {
    const userData = await readJSON(collectionName);
    const keys = Object.keys(query);

    const matchingUsers = userData.filter(user => {
        return keys.every(key => {
            return user[key] === query[key];
        });
    });
    return matchingUsers;
}

export async function findOne(query, collectionName = "users") {
    const data = await findUser(query, collectionName);
    return data[0];
}