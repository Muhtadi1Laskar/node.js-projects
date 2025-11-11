import { generatePassphrase } from "../services/passphrase.service.js";
import { successResponse } from "../utils/response.js";

export const passphraseController = (req, res, next) => {
    const {
        words,
        seperator,
        capitalize,
        addNumber
    } = req.body;

    try {
        const passphrase = generatePassphrase({ words, seperator, capitalize, addNumber});
        successResponse(res, { passphrase }, 200);
    } catch (error) {
        next(error);
    }
}