export const writeResponse = (res, data, statusCode = 200) => {
    res.writeHead(statusCode, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
}

export const parseRequest = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on("data", chunk => (chunk += data));
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                resolve(error);
            }
        });
        req.on("error", reject);
    });
}

