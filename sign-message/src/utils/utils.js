const writeResponse = (res, message) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(message));
}

export {
    writeResponse
};