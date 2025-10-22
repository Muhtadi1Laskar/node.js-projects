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

export const validateSchema = (body, schema) => {
    const errors = [];
    const parsedBody = typeof body === "string" ? JSON.parse(body) : body;

    for (const key in schema) {
        if (!parsedBody.hasOwnProperty(key)) {
            errors.push(`Missing field(s): ${key}`);
            continue;
        }

        const expectedType = schema[key];
        const actualType = typeof parsedBody[key];

        if (expectedType !== actualType) {
            errors.push(`Field '${key}' should be of type '${expectedType}', got '${actualType}'`);
        }
    }

    if (errors.length > 0) {
        return {
            valid: false,
            message: errors.join('; ')
        };
    }

    return {
        valid: true,
        message: parsedBody
    };
}