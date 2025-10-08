import { writeResponse } from "../Common/common.js";

const routes = [
    {
        method: "POST",
        path: "/encrypt/aes",
        handler: async (req, res) => {
            writeResponse(res, { message: "Encrypt Data" });
        }
    }
];

export default routes;