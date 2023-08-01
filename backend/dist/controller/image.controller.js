"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImageHandler = exports.uploadImageHandler = void 0;
const cloudinary_1 = require("cloudinary");
// @desc    Upload an image
// @route   POST /api/imageUpload/
// @access  Private
const uploadImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { folder } = req.body;
    if (req.file) {
        try {
            const uploadImage = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                folder: folder,
            });
            res.status(201).json({ image: uploadImage.url });
        }
        catch (error) {
            console.log("Error uploading file", error);
        }
    }
    else {
        res.status(500).json({ message: "file type not accepted" });
    }
});
exports.uploadImageHandler = uploadImageHandler;
const uploadMultipleImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || req.files.length === 0) {
        // No files uploaded
        return res.status(400).json({ message: "No files uploaded" });
    }
    if (req.files) {
        try {
            const uploadPromises = req.files.map((file) => cloudinary_1.v2.uploader.upload(file.path, { folder: "bookMarktApp" }));
            const uploadedImages = yield Promise.all(uploadPromises);
            const imageUrls = uploadedImages.map((uploadResult) => uploadResult.url);
            res.status(201).json({ avatars: imageUrls });
        }
        catch (error) {
            console.log("Error uploading files", error);
            res.status(500).json({ message: "Error uploading files" });
        }
    }
    // else {
    //   res.status(500).json({ message: "No files uploaded" });
    // }
});
exports.uploadMultipleImageHandler = uploadMultipleImageHandler;
//# sourceMappingURL=image.controller.js.map