import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ProductDocument } from "./product.model";
import { MessageDocument } from "./message.model";

export interface Conversation {
  sender: string;
  seller: string;
  message: string;
  productId: string;
  name: string;
  telephone: number;
}
export interface ChatInput {
  sender: string;
  seller: string;
  productId: string;
  conversation: Conversation[];
}

export interface ChatDocument extends ChatInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
const conversationSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    seller: { type: String, required: true },
    message: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String },
    telephone: { type: Number },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    sender: { type: String, required: true },
    seller: { type: String, required: true },
    conversation: [conversationSchema],
  },
  { timestamps: true }
);

const ChatModel = mongoose.model<ChatDocument>("Chat", chatSchema);

export default ChatModel;
