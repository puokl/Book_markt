"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({});
function fileFilter(req, file, cb) {
    const extension = path_1.default.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
        cb(null, false);
    }
    else {
        cb(null, true);
    }
}
const multerUpload = (0, multer_1.default)({ storage, fileFilter });
exports.default = multerUpload;
// const multerSingleUpload = multer({ storage, fileFilter }).single("file");
// const multerMultipleUpload = multer({ storage, fileFilter }).array("files");
// export { multerSingleUpload, multerMultipleUpload };
//# sourceMappingURL=multerMiddleware.js.map