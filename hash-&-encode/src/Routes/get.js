import { getListController } from "../Controllers/hash-controller.js";

export default async function getRoute(req, res) {
    switch (req.url) {
        case "/hash/list":
            await getListController(res);
            break;
    
        default:
            break;
    }
}