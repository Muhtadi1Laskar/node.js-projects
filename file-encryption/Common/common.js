function parseMultipart(req, boundary) {
    return new Promise((resolve, reject) => {
        let data = "";

        req.on("data", chunk => {
            data += chunk.toString("binary");
        });

        req.on("end", () => {
            const result = {
                fields: {},
                files: {}
            };

            const parts = data.split(`--${boundary}`);

            for (const part of parts) {
                // Skip empty or invalid parts
                if (!part.includes("Content-Disposition")) continue;

                // Extract headers and body
                const [rawHeaders, bodyWithEnd] = part.split("\r\n\r\n");
                if (!rawHeaders || !bodyWithEnd) continue;

                const body = bodyWithEnd.split("\r\n--")[0]; // remove trailing boundary

                // Extract name and filename
                const nameMatch = rawHeaders.match(/name="([^"]+)"/);
                const filenameMatch = rawHeaders.match(/filename="([^"]+)"/);

                if (!nameMatch) continue;

                const fieldName = nameMatch[1];

                if (filenameMatch) {
                    // It's a file
                    const filename = filenameMatch[1];
                    const contentTypeMatch = rawHeaders.match(/Content-Type: ([^\r\n]+)/);
                    const contentType = contentTypeMatch ? contentTypeMatch[1] : "application/octet-stream";

                    result.files[fieldName] = {
                        filename,
                        contentType,
                        content: Buffer.from(body, "binary")
                    };
                } else {
                    // It's a regular text field
                    result.fields[fieldName] = body.trim();
                }
            }

            resolve(result);
        });

        req.on("error", reject);
    });
}


const matchRoute = (URlpath, routePath) => {
    if (URlpath === '/' && routePath === '/') {
        return {};
    }

    const urlParts = URlpath.split('/').filter(Boolean);
    const routeParts = routePath.split('/').filter(Boolean);

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
        const routePart = routeParts[i];
        const urlPart = urlParts[i];

        if (routePart.startsWith(':')) {
            const key = routePart.slice(1);
            if (key.length === 0) {
                return null;
            }
            params[key] = urlPart;
        } else if (routePart !== urlPart) {
            return null;
        }
    }
    return params;
}

const writeResponse = (res, data) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(data));
}

export {
    parseMultipart,
    matchRoute,
    writeResponse
};