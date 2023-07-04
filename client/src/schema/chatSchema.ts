import { object, string, number } from "zod";

export const createChatSchema = object({
  message: string().nonempty({
    message: "Message is required",
  }),
  name: string().nonempty({
    message: "Name is required",
  }),
  telephone: number({
    invalid_type_error: "telephone must be a number",
  }),
});

export const createConversationSchema = object({
  message: string().nonempty({
    message: "Message is required",
  }),
});
