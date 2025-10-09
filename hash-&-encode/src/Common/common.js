const parseResponse = (req) => {
    return new Promise((resolve, reject) => {
        let data = '';

        req.on("data", chunk => (data += chunk.toString()));
        req.on("end", () => {
            try {
                const data = JSON.parse(data);
                resolve(data);
            } catch (error) {
                resolve(data);
            }
        });
        req.on("error", reject);
    });
}

const writeResponse = (res, data) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(data));
}

export {
    parseResponse,
    writeResponse
};