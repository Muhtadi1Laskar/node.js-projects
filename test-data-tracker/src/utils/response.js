export const successResponse = (res, data, status = 200) => res.status(status).json(data);

export const errorResponse = (res, data, status) => res.status(status).json(data);