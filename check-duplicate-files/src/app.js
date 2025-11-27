import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

async function hashFile(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');

        const stream = fs.createReadStream(filePath);

        stream.on('error', reject);

        stream.pipe(hash);

        hash.on('finish', () => {
            resolve(hash.digest('hex'));
        });
    });
}

async function walkDirectoryForSizes(dir, sizeGroups) {
    let entries;
    try {
        entries = await fsp.readdir(dir, { withFileTypes: true });
    } catch (error) {
        if (error.code !== 'ENOENT' && error.code !== 'EACCES') {
            console.error(`Warning: Could not read directory ${dir}: ${error.message}`);
        }
        return;
    }

    const promises = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            promises.push(walkDirectoryForSizes(fullPath, sizeGroups));
        } else if (entry.isFile()) {
            try {
                const stats = await fsp.stat(fullPath);
                const size = stats.size;

                if (!sizeGroups.has(size)) {
                    sizeGroups.set(size, []);
                }
                sizeGroups.get(size).push(fullPath);
            } catch (error) {
                if (error.code !== 'ENOENT' && error.code !== 'EACCES') {
                    console.error(`Warning: Could not stat file ${fullPath}: ${error.message}`);
                }
            }
        }
    }
    await Promise.all(promises);
}

async function findDuplicateFiles(root) {
    const sizeGroups = new Map();
    const finalDuplicates = new Map();

    console.log("Phase 1: Walking directory and grouping files by size...");
    await walkDirectoryForSizes(root, sizeGroups);

    console.log("Phase 2: Hashing files in groups with >1 file...");
    const hashPromises = [];

    for (const [size, files] of sizeGroups.entries()) {
        if (files.length > 1) {
            for (const file of files) {
                hashPromises.push(
                    hashFile(file).then(hash => ({ hash, file }))
                );
            }
        }
    }

    const hashedFiles = await Promise.all(hashPromises);

    for (const { hash, file } of hashedFiles) {
        if (!finalDuplicates.has(hash)) {
            finalDuplicates.set(hash, []);
        }
        finalDuplicates.get(hash).push(file);
    }

    const result = new Map();
    for (const [hash, paths] of finalDuplicates.entries()) {
        if (paths.length > 1) {
            result.set(hash, paths);
        }
    }

    return result;
}


(async () => {
    const rootDir = process.argv[2] || path.resolve('.');

    console.log(`Starting duplicate search in: ${rootDir}`);
    console.log("-----------------------------------------");

    try {
        const dups = await findDuplicateFiles(rootDir);

        let totalDupCount = 0;

        if (dups.size === 0) {
            console.log("\nNo duplicate files found.");
            return;
        }

        console.log("\n--- Duplicate Files Found ---");
        for (const [hash, files] of dups.entries()) {
            totalDupCount += files.length;
            console.log(`\nHash: ${hash}`);
            for (const f of files) {
                console.log(`  - ${f}`);
            }
        }

        console.log(`\nTotal duplicate files across all groups: ${totalDupCount}`);

    } catch (error) {
        console.error("\n[CRITICAL ERROR] Failed to run duplicate finder:", error);
    }
})();