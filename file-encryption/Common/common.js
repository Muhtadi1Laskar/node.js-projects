function parseMultipart(req, boundary) {
    return new Promise((resolve, reject) => {
        let data = "";

        req.on("data", chunk => {
            data += chunk.toString("binary");
        });

        req.on("end", () => {
            const parts = data.split(`--${boundary}`);
            for (const part of parts) {
                if (part.includes("Content-Disposition")) {
                    const match = part.match(/name="([^"]+)"; filename="([^"]+)"/);
                    if (match) {
                        const fileContent = part.split("\r\n\r\n")[1].split("\r\n--")[0];
                        return resolve(fileContent);
                    }
                }
            }
            resolve(null);
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