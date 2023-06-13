import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {


  // find out the file extension
  // file.originalname from multer
  const extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
    // if it is not any of the extensions allowed, we don't allow the upload
    cb(null, false);
  } else {
      // To accept the file pass `true`, like so:
      cb(null, true);

  }


  const multerUpload = multer({storage, fileFilter})
  // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!"));
}
