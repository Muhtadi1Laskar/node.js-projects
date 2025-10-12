import MerkleTree from "../services/merkleTree.js";
import { writeResponse } from "../utils/utils.js";

async function createMerkleController(res, reqBody) {
    const { data } = reqBody;

    if(data.length < 0) {
        writeResponse(res, {
            message: "No documents provided"
        });
        return;
    }

    const tree = new MerkleTree(data);
    const root = tree.getRoot();

    writeResponse(res, {
        root: root
    });
    return;
}

export {
    createMerkleController
};