import { Request, Response } from "express";
import cloudinaryConfig from "../config/cloudinary";
import { v2 as cloudinary } from "cloudinary";

// @desc    Create a single product
// @route   POST /api/products/
// @access  Private
export const uploadImageHandler = async (req: Request, res: Response) => {
  // upload file
  if (req.file) {
    try {
      // upload file
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "travelApp",
      });
      console.log("uploadImage", uploadImage);
      res.status(201).json({
        message: "picture uploaded successfully",
        avatar: uploadImage.url,
      });
    } catch (error) {
      console.log("error uploading file", error);
    }
  } else {
    res.status(500).json({ message: "file type not accepted" });
  }
};
