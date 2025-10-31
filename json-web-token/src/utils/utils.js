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

export const validateSchema = (schema, body) => {
    const errors = [];
    const parsedBody = typeof body === "string" ? JSON.stringify(body) : body;

    for (const elem in schema) {
        if (!parsedBody.hasOwnProperty(elem)) {
            errors.push(`Missing field(s): ${elem}`);
            continue;
        }

        const expectedType = schema[elem];
        const actualType = typeof parsedBody[elem];

        if (expectedType !== actualType) {
            errors.push(`Field '${key}' should be of type '${expectedType}', got '${actualType}'`);
        }
    }

    if (errors.length > 0) {
        return {
            valid: false,
            message: errors.join(', ')
        };
    }

    return {
        valid: true,
        data: parsedBody
    };
}

