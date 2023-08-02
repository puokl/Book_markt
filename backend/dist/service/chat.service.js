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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdateChat = exports.findConversation = exports.findAllUserSentChat = exports.findAllUserChat = exports.createChat = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
function createChat(input) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("createChat service", input);
        return chat_model_1.default.create(input);
    });
}
exports.createChat = createChat;
function findAllUserChat(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return chat_model_1.default.find({ sellerId: userId });
    });
}
exports.findAllUserChat = findAllUserChat;
function findAllUserSentChat(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("userId in findAllUserSentChat", userId);
            const data = chat_model_1.default.find({ senderId: userId });
            console.log("data in findAllUserSentChat", data);
            return data;
        }
        catch (error) { }
        // return ChatModel.find({ senderId: userId });
    });
}
exports.findAllUserSentChat = findAllUserSentChat;
function findConversation(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        return chat_model_1.default.findById(chatId);
    });
}
exports.findConversation = findConversation;
function findAndUpdateChat(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return chat_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateChat = findAndUpdateChat;
//# sourceMappingURL=chat.service.js.map