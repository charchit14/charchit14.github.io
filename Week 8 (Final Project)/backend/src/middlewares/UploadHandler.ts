import multer from "multer";
import path from "path";

// Multer storage configuration
const storage = multer.diskStorage({
  // Define the destination folder for uploaded files
  destination: function (req, file, cb) {
    // Determine the destination folder based on the user (or use "user" as a default)
    const folder = (req as any).user || "user";
    const destinationPath = path.join("./uploads", folder);
    cb(null, destinationPath);
  },
  // Define the filename for uploaded files
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp, fieldname, and original filename
    cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname);
  },
});

// Create a Multer instance with the defined storage configuration
const UploadHandler = multer({ storage });

// Export the UploadHandler middleware for use in the application
export default UploadHandler;
