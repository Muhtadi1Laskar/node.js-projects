export const successResponse = (res, data) => {
    res.WriteHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
}

