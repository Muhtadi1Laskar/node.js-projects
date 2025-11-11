export const successResponse = (res, data, status = 200) => {
    return res.status(status).json(data);
}

export const errorResponse = (res, message, status = 400) => {
    return res.status(status).json(message);
}