import { createNote, getNotes, updateNote } from "../services/note.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const makeNote = async (res, body) => {
    try {
        const note = await createNote(body);
        successResponse(res, note, 201);
    } catch (error) {
        errorResponse(res, { message: error.message }, 403);
    }
}

export const getAllNotes = async (res, body) => {
    try {
        const notes = await getNotes({ userID: body.userID });
        successResponse(res, {
            notes: notes,
            totalNotes: notes.length
        }, 201);
    } catch (error) {
        errorResponse(res, { message: error.message }, 403);
    }
}

export const updateNotes = async (res, body) => {
    try {
        const notes = await updateNote(body);
        successResponse(res, { message: notes }, 200);
    } catch (error) {
        errorResponse(res, { message: error.message }, 403);
    }
}