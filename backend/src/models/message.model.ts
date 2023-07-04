import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ProductDocument } from "./product.model";

export interface MessageInput {
  sender: UserDocument["_id"];
  // buyer: UserDocument["_id"];
  // product: ProductDocument["_id"];
  productId: string;
  message: string;
  name: string;
  telephone: number;
}

export interface MessageDocument extends MessageInput, mongoose.Document {
  // chatId: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    // seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller: { type: String, required: true },
    message: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    telephone: { type: Number, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);

export default MessageModel;
