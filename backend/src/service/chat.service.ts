import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ChatModel, { ChatDocument, ChatInput } from "../models/chat.model";

export async function createChat(input: ChatInput) {
  console.log("createChat service", input);
  return ChatModel.create(input);
}

export async function findAllUserChat(userId: string) {
  return ChatModel.find({ seller: userId });
}

export async function findAllUserSentChat(userId: string) {
  return ChatModel.find({ sender: userId });
}

export async function findConversation(chatId: string) {
  return ChatModel.findById(chatId);
}

export async function findAndUpdateChat(
  query: FilterQuery<ChatDocument>,
  update: UpdateQuery<ChatDocument>,
  options: QueryOptions
) {
  return ChatModel.findOneAndUpdate(query, update, options);
}
