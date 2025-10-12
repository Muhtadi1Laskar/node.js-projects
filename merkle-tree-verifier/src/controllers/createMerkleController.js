import MerkleTree from "../services/merkleTree.js";
import { writeResponse } from "../utils/utils.js";

async function createMerkleController(res, reqBody) {
    const { data } = reqBody;

    if (!data || data.length === 0) {
        writeResponse(res, {
            message: "No documents provided"
        });
        return;
    }

    if (!Array.isArray(data) || !data.every(d => typeof d === "string")) {
        writeResponse(res, {
            success: false,
            message: "Invalid data format. Expected an array of strings."
        });
    }

    const tree = new MerkleTree(data);
    const root = tree.getRoot();
    const proof = data.map((_, i) => tree.getProof(i));

    writeResponse(res, {
        message: "Merkle tree created successfully",
        rootHash: root,
        totalLeaves: data.length,
        proof
    });
    return;
}

export {
    createMerkleController
};