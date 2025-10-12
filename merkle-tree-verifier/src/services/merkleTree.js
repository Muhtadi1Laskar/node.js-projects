import { hashData } from "./hashFunction.js";

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves.map(hashData);
        this.levels = this.build(this.leaves);
        this.root = this.levels[this.levels.length - 1][0];
    }

    
}