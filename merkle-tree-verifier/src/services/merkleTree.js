import { hashData } from "./hashFunction.js";

export default class MerkleTree {
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
