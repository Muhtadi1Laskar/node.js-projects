export const errorResponse = (res, data, status) => res.status(status).json(data);

export const successResponse = (res, data, status) => res.status(status).json(data);