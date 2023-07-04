import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import MessageModel, { MessageInput } from "../models/message.model";

export async function createMessage(input: MessageInput) {
  return MessageModel.create(input);
}
