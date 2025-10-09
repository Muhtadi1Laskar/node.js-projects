const parseRequest = (req) => {
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

const validateRequestBody = (body, schema) => {
    const errors = [];
    const parsed = typeof body === "string" ? JSON.parse(body) : body;

    for (const key in schema) {
        if (!parsed.hasOwnProperty(key)) {
            errors.push(`Missing required field: ${key}`);
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
            message: errors.join("; ")
        }
    }

    return {
        valid: true,
        data: parsed,
    }
}


export {
    parseRequest,
    writeResponse,
    validateRequestBody
};