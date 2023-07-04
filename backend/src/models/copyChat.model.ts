import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ProductDocument } from "./product.model";
import { MessageDocument } from "./message.model";

export interface ChatInput {
  // sender: UserDocument["_id"];
  // seller: UserDocument["_id"];
  sender: string;
  seller: string;
  productId: string;
  // productId: ProductDocument["productId"];
  conversation: MessageDocument["_id"] | [];
}

export interface ChatDocument extends ChatInput, mongoose.Document {
  // chatId: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new mongoose.Schema(
  {
    // sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sender: { type: String, required: true },
    seller: { type: String, required: true },
    // conversation: { type: Array, default: [] },
    conversation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    productId: { type: String, required: true },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model<ChatDocument>("Chat", chatSchema);

export default ChatModel;
