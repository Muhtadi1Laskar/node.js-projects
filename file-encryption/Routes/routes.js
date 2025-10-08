import { parseMultipart } from "../Common/common.js";
import fileUploadController from "../Controllers/file-upload-controllers.js";

const routes = [
    {
        method: "POST",
        path: "/aes",
        handler: async (req, res) => {
            const boundary = req.headers["content-type"].split("boundary=")[1];
            const {fields, files} = await parseMultipart(req, boundary);
            await fileUploadController(res, fields, files);
        }
    }
];

export default routes;