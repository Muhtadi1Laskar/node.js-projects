import { writeJSON } from "../utils/database.js"
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