"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const conversationSchema = new mongoose_1.default.Schema({
    senderId: { type: String, required: true },
    sellerId: { type: String, required: true },
    senderName: { type: String, required: true },
    sellerName: { type: String, required: true },
    message: { type: String, required: true },
    productId: { type: String, required: true },
}, { timestamps: true });
const chatSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: true },
    productImage: { type: String, required: true },
    senderId: { type: String, required: true },
    sellerId: { type: String, required: true },
    senderName: { type: String, required: true },
    sellerName: { type: String, required: true },
    title: { type: String, required: true },
    conversation: [conversationSchema],
}, { timestamps: true });
const ChatModel = mongoose_1.default.model("Chat", chatSchema);
exports.default = ChatModel;
//# sourceMappingURL=chat.model.js.map