export const writeResponse = (res, data, statusCode = 200) => {
    res.WriteHead(statusCode, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
}

