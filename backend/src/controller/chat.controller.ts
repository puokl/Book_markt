import { Request, Response } from "express";
import {
  AddConversationInput,
  CreateChatInput,
  UpdateChatInput,
} from "../schema/chat.schema";
import {
  findConversation,
  createChat,
  findAllUserChat,
  findAllUserSentChat,
  findAndUpdateChat,
} from "../service/chat.service";

// @desc    Create a single chat
// @route   POST /api/chat/
// @access  Private
export async function createChatHandler(
  req: Request<{}, {}, CreateChatInput["body"]>,
  res: Response
) {
  try {
    const senderId = res.locals.user._id;
    const body = req.body;
    console.log("req.body;", req.body);
    console.log("before createChat");
    console.log("createChat props in controller", {
      ...body,
      sender: senderId,
    });
    const chat = await createChat({ ...body, sender: senderId });
    console.log("after createChat");
    return res.send(chat);
  } catch (error) {
    console.log("error", error);
  }
}

// @desc    Get all chat received from a user
// @route   GET /api/chat/:userId
// @access  Private
export async function getAllUserChatHandler(
  req: Request<UpdateChatInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const chat = await findAllUserChat(userId);
  if (!chat) {
    return res.sendStatus(404);
  }
  return res.send(chat);
}

// @desc    Get all chat sent from a user
// @route   GET /api/chat/:userId
// @access  Private
export async function getAllUserSentChatHandler(
  req: Request<UpdateChatInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const chat = await findAllUserSentChat(userId);
  if (!chat) {
    return res.sendStatus(404);
  }
  return res.send(chat);
}

// @desc    Add a conversation to the chat
// @route   POST /api/chat/:userId
// @access  Private
//FIXME - check req, res params
export async function addConversationHandler(
  req: Request<{}, {}, AddConversationInput["body"]>,
  res: Response
) {
  try {
    console.log("req.body", req.body);
    console.log("req.params", req.params);
    const { chatId } = req.params;
    const conversation = req.body;
    console.log("chatId", chatId);
    // Find the chat document by ID
    const chat = await findConversation(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    console.log("conversation in addConversationHandler", conversation);
    // Add the new conversation to the conversation array
    chat.conversation.push(conversation);
    console.log("chat.conversation", chat);
    console.log("first");
    // Save the updated chat document

    const updatedChat = await chat.save();
    // const updatedChat = await findAndUpdateChat({ chatId }, chat, {
    //   new: false,
    // });
    console.log("second");
    console.log("updatedChat", updatedChat);
    // res.status(200).json({ chat: updatedChat });
    res.status(200).send(updatedChat);
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
}

// @desc    Get a single chat from a user
// @route   GET /api/chat/:userId/:chatId
// @access  Private

// @desc    Updte a single chat from a user
// @route   PUT /api/chat/:userId/:chatId
// @access  Private
