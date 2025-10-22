import crypto from "node:crypto";
import sharp from "sharp";

class IdenticonGenerator {
    constructor(input, options = {}) {
        this.input = input;
        this.size = options.size || 250;
        this.hashAlgorithm = options.hashAlgorithm || "sha256";
        this.backgroundColor = options.backgroundColor || { r: 240, g: 240, b: 240, alpha: 1 };

        if (this.size % 5 !== 0) {
            throw new Error("Image size must be divisible by 5");
        }

        this.cellSize = this.size / 5;
        this.hash = this._generateHash();
        this.color = this._pickColor();
        this.grid = this._buildGrid();
    }

    _generateHash() {
        const hash = crypto.createHash(this.hashAlgorithm);
        hash.update(this.input);
        return hash.digest();
    }

    _pickColor() {
        return {
            r: this.hash[0],
            g: this.hash[1],
            b: this.hash[2],
            alpha: 1
        };
    }

    _buildGrid() {
        const grid = [];
        for (let i = 0; i < 15; i += 3) {
            const row = [
                this.hash[i],
                this.hash[i + 1],
                this.hash[i + 2],
                this.hash[i + 1],
                this.hash[i]
            ];
            grid.push(...row);
        }
        return grid;
    }

    async generate() {
        const colordSquares = [];
        const coloredSquaredBuffer = await sharp({
            create: {
                width: this.cellSize,
                height: this.cellSize,
                channels: 4,
                background: this.color
            }
        }).png().toBuffer();

        this.grid.forEach((value, index) => {
            if(value % 2 === 0) {
                const x = (index % 5) * this.cellSize;
                const y = Math.floor(index / 5) * this.cellSize;
                colordSquares.push({
                    input: coloredSquaredBuffer,
                    top: y,
                    left: x
                });
            }
        });

        const imageBuffer = await sharp({
            create: {
                width: this.size,
                height: this.size,
                channels: 4,
                background: this.backgroundColor
            }
        })
        .composite(colordSquares)
        .png()
        .toBuffer();

        return imageBuffer.toString("base64");
    }
}

export default IdenticonGenerator;