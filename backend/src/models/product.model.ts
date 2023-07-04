import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}
export interface ProductInputTest {
  user: UserDocument["_id"];
  title: string;
  author: string;
  description: string;
  price: number;
  // image: string;
  pages: number;
  language: string;
  year: number;
  // location: string;
  // isAvailable: boolean;
  condition: string;
}

export interface ProductDocument extends ProductInputTest, mongoose.Document {
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    author: { type: String, requiredì: true },
    condition: { type: String, required: false },
    language: { type: String, required: true },
    // image: { type: String, required: false },
    pages: { type: Number, required: false },
    year: { type: Number, required: false },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
