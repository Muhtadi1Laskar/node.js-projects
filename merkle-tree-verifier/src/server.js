import crypto from "crypto";

function hashData(data) {
    if (typeof data !== "string") {
        data = data.toString();
    }
    return crypto.createHash("sha256").update(data, "utf-8").digest("hex");
}

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves.map(hashData);
        this.levels = this.build(this.leaves);
        this.root = this.levels[this.levels.length - 1][0];
    }

    build(leaves) {
        if (leaves.length === 0) return [[]];

        const levels = [leaves];
        let currentLevel = leaves;

        while (currentLevel.length > 1) {
            const nextLevel = [];
            const length = currentLevel.length;

            for (let i = 0; i < length; i += 2) {
                const left = currentLevel[i];
                const right = currentLevel[i + 1] || currentLevel[i];
                nextLevel.push(hashData(left + right));
            }

            levels.push(nextLevel);
            currentLevel = nextLevel;
        }

        return levels;
    }

    getRoot() {
        return this.root;
    }

    getProof(leafIndex) {
        if (leafIndex < 0 || leafIndex >= this.leaves.length) {
            throw new Error("Invalid leaf index");
        }

        const proof = [];
        let currentIndex = leafIndex;

        for (let level = 0; level < this.levels.length - 1; level++) {
            const currentLevel = this.levels[level];
            const isRightNode = currentIndex % 2 === 1;
            const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;

            if (siblingIndex < currentLevel.length) {
                proof.push({
                    position: isRightNode ? "left" : "right",
                    data: currentLevel[siblingIndex],
                });
            }

            currentIndex = Math.floor(currentIndex / 2);
        }

        return proof;
    }

    verify(leaf, proof) {
        let computedHash = hashData(leaf);

        for (const step of proof) {
            if (step.position === "left") {
                computedHash = hashData(step.data + computedHash);
            } else {
                computedHash = hashData(computedHash + step.data);
            }
        }

        return computedHash === this.root;
    }
}


// 1️⃣ Your document chunks (paragraphs or text blocks)
const documentChunks = [
    "Blockchain ensures data integrity through consensus.",
    "Merkle trees allow efficient verification of data chunks.",
    "Each leaf node represents a hashed data block.",
    "Parent nodes store hashes of their children.",
    "The root hash summarizes the entire dataset."
];

// 2️⃣ Build the Merkle tree
const tree = new MerkleTree(documentChunks);
const rootHash = tree.getRoot();
console.log("Root Hash:", rootHash);

// 3️⃣ Generate proof for a specific paragraph
const paragraphIndex = 1; // verifying the 2nd paragraph
const proof = tree.getProof(paragraphIndex);

console.log("\nMerkle Proof for paragraph #2:");
console.log(proof);

// 4️⃣ Later (or on another machine), verify inclusion using only:
// - The paragraph
// - The proof
// - The known root hash
const leaf = documentChunks[paragraphIndex];
const isValid = tree.verify(leaf, proof);

console.log("\nVerification result:", isValid ? "✅ Valid" : "❌ Invalid");