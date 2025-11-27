import fs from "node:fs/promises"; // Use the promises API for better async control
import path from "node:path";

// The path variable isn't used inside the function, but is good for context
const filePathString = "C:/Users/laska/Pictures";

// --- Fix 1: Optimized Recursive Function ---
const walkDirectory = async (dir) => {
    let filePaths = [];
    
    // We can use fs.readdir(dir) as it now defaults to the promises API.
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        console.log(entry.size)
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            // Fix 2: Use spread syntax (...) to merge arrays. 
            // This is generally cleaner and more efficient than concat().
            filePaths.push(...(await walkDirectory(fullPath)));
            
        } else if (entry.isFile()) {
            filePaths.push(fullPath);
        }
        // Note: You might want to add error handling for symbolic links (isSymbolicLink())
    }
    
    return filePaths;
}

// --- Execution Block ---
(async () => {
    try {
        // You should use the variable or the function call's first argument
        const files = await walkDirectory(filePathString); 
        console.log(files);
    } catch (error) {
        // Fix 3: Typos corrected (e.g., "waling" -> "walking")
        console.error("Error walking directory: ", error);
    }
})(); // Fix 4: The missing final parentheses to invoke the function!