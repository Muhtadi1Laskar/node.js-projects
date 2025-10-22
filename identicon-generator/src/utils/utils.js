export const writeResponse = (res, data, statusCode = 200) => {
    res.WriteHead(statusCode, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
}

export const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on("data", chunk => (body += chunk.toString()));
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                resolve(body);
            }
        });
        res.on("error", reject);
    });
}