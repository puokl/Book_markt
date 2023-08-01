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
exports.addConversationHandler = exports.getAllUserSentChatHandler = exports.getAllUserChatHandler = exports.createChatHandler = void 0;
const chat_service_1 = require("../service/chat.service");
// @desc    Create a single chat
// @route   POST /api/chat
// @access  Private
function createChatHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const senderID = res.locals.user._id;
            const body = req.body;
            const chat = yield (0, chat_service_1.createChat)(Object.assign({}, body));
            return res.send(chat);
        }
        catch (error) {
            console.log("error", error);
        }
    });
}
exports.createChatHandler = createChatHandler;
// @desc    Get all chat received from a user
// @route   GET /api/chat/received
// @access  Private
function getAllUserChatHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const chat = yield (0, chat_service_1.findAllUserChat)(userId);
        if (!chat) {
            return res.sendStatus(404);
        }
        return res.send(chat);
    });
}
exports.getAllUserChatHandler = getAllUserChatHandler;
// @desc    Get all chat sent from a user
// @route   GET /api/chat/sent
// @access  Private
function getAllUserSentChatHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const chat = yield (0, chat_service_1.findAllUserSentChat)(userId);
        if (!chat) {
            return res.sendStatus(404);
        }
        return res.send(chat);
    });
}
exports.getAllUserSentChatHandler = getAllUserSentChatHandler;
function addConversationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { chatId } = req.params;
            const conversation = req.body;
            // Find the chat document by ID
            const chat = yield (0, chat_service_1.findConversation)(chatId);
            if (!chat) {
                return res.status(404).json({ error: "Chat not found" });
            }
            // Add the new conversation to the conversation array
            chat.conversation.push(conversation);
            // Save the updated chat document
            const updatedChat = yield chat.save();
            // res.status(200).json({ chat: updatedChat });
            res.status(200).send(updatedChat);
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    });
}
exports.addConversationHandler = addConversationHandler;
// @desc    Get a single chat from a user
// @route   GET /api/chat/:userId/:chatId
// @access  Private
// @desc    Updte a single chat from a user
// @route   PUT /api/chat/:userId/:chatId
// @access  Private
//# sourceMappingURL=chat.controller.js.map