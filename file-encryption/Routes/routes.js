import { writeResponse, parseMultipart } from "../Common/common.js";
import fileUploadController from "../Controllers/file-upload-controllers.js";

const routes = [
    {
        method: "POST",
        path: "/encrypt/aes",
        handler: async (req, res) => {
            writeResponse(res, { message: "Encrypt Data" });
            const fileData = await parseMultipart(req);
            await fileUploadController(res, fileData);
        }
    }
];

export default routes;