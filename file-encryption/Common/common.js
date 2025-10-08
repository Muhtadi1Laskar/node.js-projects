const readFile = (req) => {
    return new Promise((reject, resolve) => {
        let body = '';

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            resolve(body);
        });

        req.on("error", reject)
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
    readFile,
    matchRoute,
    writeResponse
};