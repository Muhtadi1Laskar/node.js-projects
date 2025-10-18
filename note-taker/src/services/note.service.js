import { findUser, readJSON, writeJSON } from "../utils/database.js"
import { generateID } from "../utils/utils.js"

export const createNote = async ({ title, content, tags, userID }) => {
    const note = {
        noteID: generateID(),
        userID,
        title,
        content,
        tags: tags || [],
        archived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    try {
        await writeJSON("note", note);
        return {
            message: "Successfully created the note",
            note
        };
    } catch (error) {
        throw new Error(error);
    }
}

export const getNotes = async (query) => {
    try {
        const notes = await findUser(query, "note");

        if (notes.length === 0) {
            throw new Error("There are no notes under this userID");
        }

        return notes;
    } catch (error) {
        throw new Error(error);
    }
}