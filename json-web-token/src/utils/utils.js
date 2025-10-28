export const writeResponse = (res, data, statusCode = 200) => {
    res.writeHead(statusCode, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
}



