import { object, number, string, TypeOf, array, z } from "zod";

const conversationItemSchema = object({
  sender: string({}),
  seller: string({}),
  productId: string({}),
  message: string({ required_error: "A message is required" }).min(
    4,
    "Send a meaningful message, at least 4 charactes"
  ),
  name: string({}),
  telephone: number({}),
});
const payload = {
  body: object({
    sender: string({}),
    seller: string({}),
    productId: string({}),
    conversation: z
      .array(conversationItemSchema)
      .refine(
        (value) => value.length > 0 || value.length === 0,
        "Empty array or array of objects"
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

export const createChatSchema = object({
  ...payload,
});

export const updateChatSchema = object({
  ...payload,
  ...params,
});

export const deleteChatSchema = object({
  ...params,
});

export const getChatSchema = object({
  ...params,
});

// export type CreateChatInput = TypeOf<typeof createChatSchema>;
export type CreateChatInput = TypeOf<typeof payload.body>;
export type UpdateChatInput = TypeOf<typeof updateChatSchema>;
export type DeleteChatInput = TypeOf<typeof deleteChatSchema>;
export type GetChatInput = TypeOf<typeof getChatSchema>;

const conversationPayload = {
  body: object({
    message: string({}),
    sender: string({}),
    seller: string({}),
    productId: string({}),
    name: string({}),
    chatId: string({}),
  }),
};
export const addConversationSchema = object({
  ...conversationPayload,
});
export type AddConversationInput = TypeOf<typeof addConversationSchema>;
