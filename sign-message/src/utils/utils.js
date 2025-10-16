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

const validateRequestBody = (reqBody, schema) => {
    const errors = [];
    const parsed = typeof reqBody === "string" ? JSON.parse(reqBody) : reqBody;

    for (const key in schema) {
        if (!parsed.hasOwnProperty(key)) {
            error.push(`Missing required field(s): ${key}`);
            continue;
        }

        const expectedType = schema[key];
        const actualType = typeof parsed[key];

        if (actualType !== expectedType) {
            errors.push(`Field '${key}' should be of type '${expectedType}', got '${actualType}'`);
        }
    }

    if (errors.length > 0) {
        return {
            valid: false,
            message: errors.join(", ")
        };
    }

    return {
        valid: true,
        data: parsed
    };
}


const writeResponse = (res, message) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(message));
}

export {
    writeResponse,
    parseRequest,
    validateRequestBody
};