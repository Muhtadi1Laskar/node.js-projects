const parseResponse = (req) => {
    return new Promise((reject, resolve) => {
        let data = '';

        req.on("data", chunk => (data += chunk.toString()));
        req.on("end", () => {
            try {
                const data = JSON.parse(data);
                resolve(data)
            } catch (error) {
                resolve(data);
            }
        });
        req.on("error", reject);
    });
}

export {
    parseResponse
}