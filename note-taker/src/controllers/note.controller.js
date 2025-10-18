import { createNote, getNotes } from "../services/note.service.js";
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
    console.log(body);
    try {
        const notes = await getNotes({ userID: body.userID });
        successResponse(res, notes, 201);
    } catch (error) {
        errorResponse(res, { message: error.message }, 403);
    }
}