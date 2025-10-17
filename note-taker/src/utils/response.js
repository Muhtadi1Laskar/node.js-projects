const successResponse = (res, message, statusCode = 200) => {
    res.writeHead(statusCode, { "content-type": "application" });
    res.end(JSON.stringify(message));
}

const errorResponse = (res, message, statusCode) => {
    res.writeHead(statusCode, { "content-type": "application/json" });
    res.end(JSON.stringify(message));
}


export {
    successResponse,
    errorResponse
}