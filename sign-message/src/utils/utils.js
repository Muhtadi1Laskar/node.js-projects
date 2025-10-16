const parseRequest = (req) => {
    return new Promise((reject, resolve) => {
        let body = '';

        req.on("data", chunk => (body += chunk.toString()));
        req.on("end", () => {
            try {
                const requestBody = JSON.parse(body);
                resolve(body) 
            } catch (error) {
                resolve(body);
            }
        });
        req.on("error", reject);
    });
}


const writeResponse = (res, message) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(message));
}

export {
    writeResponse,
    parseRequest
};