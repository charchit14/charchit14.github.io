import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = (req as any).user || "user";
    const destinationPath = path.join("./uploads", folder);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    console.log("object");
    cb(null, Date.now() + "-" + file.fieldname + "-" + file.originalname);
  },
});

const UploadHandler = multer({ storage });

export default UploadHandler;
