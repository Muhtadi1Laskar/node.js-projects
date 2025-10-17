const validateSchema = (body, schema) => {
    const errors = [];
    const parsedBody = typeof body === "string" ? JSON.parse(body): body;

    for(const key in schema) {
        if(!parsedBody.hasOwnProperty(key)) {
            errors.push(`Missing field(s): ${key}`);
            continue;
        }

        const expectedType = schema[key];
        const actualType = typeof parsedBody[key];

        if(expectedType !== actualType) {
            errors.push(`Field '${key}' should be of type '${expectedType}', got '${actualType}'`);
        }
    }

    if(errors.length > 0) {
        return {
            valid: false,
            message: errors.join('; ')
        }
    }
    return {
        valid: true,
        data: parsedBody
    }
}

export {
    validateSchema
};