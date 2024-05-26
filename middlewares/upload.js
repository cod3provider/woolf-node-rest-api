import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

// const fileFilter = (req, file, cb) => {
//   const extension = file.originalname.split(".").pop();
//   if (extension !== "jpeg" || extension !== "jpg" || extension !== "png") {
//     return cb(new HttpError(400, "This file extension is not allowed"));
//   }
//   cb(null, true);
// };

const upload = multer({
  storage,
  limits,
  // fileFilter,
});

export default upload;
