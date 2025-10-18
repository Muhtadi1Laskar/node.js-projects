import { findUser, readJSON, writeJSON, writeNewJSON } from "../utils/database.js"
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

export const updateNote = async ({ userID, noteID, fieldsToUpdate }) => {
    const allNotes = await readJSON("note");
    const noteIndex = allNotes.findIndex(note => note.userID === userID && note.noteID === noteID);

    if (noteIndex === -1) {
        throw new Error("Note not found for the specified user");
    }

    const updateNote = {
        ...allNotes[noteIndex],
        ...fieldsToUpdate,
        updatedAt: new Date().toISOString()
    }

    allNotes[noteIndex] = updateNote;

    await writeNewJSON("note", allNotes);

    return {
        message: "Successfully update the note",
        note: updateNote
    };
}

export const deleteNote = async ({ userID, noteID, fieldsToUpdate }) => {
    const allNotes = await readJSON("note");
    const noteIndex = allNotes.findIndex(note => note.userID === userID && note.noteID === noteID);

    if (noteIndex === -1) {
        throw new Error("Note not found for the specified user");
    }

    const noteToDelete = allNotes[noteIndex];
    const newNotes = allNotes.filter(note => note.userID !== userID && note.noteID !== noteID);
    console.log(newNotes);
    await writeNewJSON("note", newNotes);

    return {
        message: "Successfully deleted the note",
        deletedNote: noteToDelete
    };
}