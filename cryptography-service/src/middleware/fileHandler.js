import multer from "multer";

const acceptedFileTypes = ["text/plain", "application/pdf", "application/epub+zip"];
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (acceptedFileTypes.includes(file.mimetype) || file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"), false);
        }
    }
});

export const uploadSingle = upload.single("file");
export const uploadMultiple = upload.array("file", 5);