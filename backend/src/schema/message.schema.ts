import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    sender: string({}),
    // buyer: string({}),
    product: string({}),
    message: string({ required_error: "A message is required" }).min(
      4,
      "Send a meaningful message, at least 4 charactes"
    ),
  }),
};

const params = {
  params: object({
    chatId: string({
      required_error: "chatId is required",
    }),
  }),
};

export const createMessageSchema = object({
  ...payload,
});

export const updateMessageSchema = object({
  ...payload,
  ...params,
});

export const deleteMessageSchema = object({
  ...params,
});

export const getMessageSchema = object({
  ...params,
});

export type CreateMessageInput = TypeOf<typeof createMessageSchema>;
export type UpdateMessageInput = TypeOf<typeof updateMessageSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>;
export type GetMessageInput = TypeOf<typeof getMessageSchema>;
