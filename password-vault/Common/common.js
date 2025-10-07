const matchRoute = (urlPath, routePath) => {
    const urlParts = urlPath.split('/').filter(Boolean);
    const routeParts = routePath.split('/').filter(Boolean);

    if (urlParts.length !== routeParts.length) return null;

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
            const key = routeParts[i].slice(1);
            params[key] = urlParts[i];
        } else if (routeParts[i] !== urlParts[i]) {
            return null;
        }
    }
    return params;
}

const parseReqBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                resolve(data);
            } catch (error) {
                resolve(body);
            }
        });
        req.on("error", reject);
    });
}

const writeResponse = (res, data) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(data));
}

export {
    matchRoute,
    parseReqBody,
    writeResponse
};