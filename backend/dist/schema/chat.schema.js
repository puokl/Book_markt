"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConversationSchema = exports.getChatSchema = exports.deleteChatSchema = exports.updateChatSchema = exports.createChatSchema = void 0;
const zod_1 = require("zod");
const conversationItemSchema = (0, zod_1.object)({
    senderId: (0, zod_1.string)({}),
    sellerId: (0, zod_1.string)({}),
    senderName: (0, zod_1.string)({}),
    sellerName: (0, zod_1.string)({}),
    productId: (0, zod_1.string)({}),
    message: (0, zod_1.string)({ required_error: "A message is required" }).min(4, "Send a meaningful message, at least 4 charactes"),
});
const payload = {
    body: (0, zod_1.object)({
        senderId: (0, zod_1.string)({}),
        sellerId: (0, zod_1.string)({}),
        senderName: (0, zod_1.string)({}),
        sellerName: (0, zod_1.string)({}),
        productId: (0, zod_1.string)({}),
        productName: (0, zod_1.string)({}),
        productImage: (0, zod_1.string)({}),
        title: (0, zod_1.string)({}),
        conversation: zod_1.z
            .array(conversationItemSchema)
            .refine((value) => value.length > 0 || value.length === 0, "Empty array or array of objects"),
    }),
};
const params = {
    params: (0, zod_1.object)({
        chatId: (0, zod_1.string)({
            required_error: "chatId is required",
        }),
    }),
};
exports.createChatSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateChatSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteChatSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getChatSchema = (0, zod_1.object)(Object.assign({}, params));
const conversationPayload = {
    body: (0, zod_1.object)({
        message: (0, zod_1.string)({}),
        senderId: (0, zod_1.string)({}),
        sellerId: (0, zod_1.string)({}),
        senderName: (0, zod_1.string)({}),
        sellerName: (0, zod_1.string)({}),
        productId: (0, zod_1.string)({}),
        chatId: (0, zod_1.string)({}),
    }),
};
exports.addConversationSchema = (0, zod_1.object)(Object.assign({}, conversationPayload));
//# sourceMappingURL=chat.schema.js.map