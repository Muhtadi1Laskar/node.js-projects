import { writeJSON } from "../utils/database.js"
import { generateID } from "../utils/utils.js"

export const createNote = async ({ title, content, tags, userID }) => {
    const note = {
        noteID: generateID(),
        userID,
        title,
        content,
        tags
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