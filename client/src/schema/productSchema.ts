import { object, string, number } from "zod";

export const createProductSchema = object({
  title: string().nonempty({ message: "Title is required" }),
  author: string().nonempty({ message: "Author is required" }),
  price: number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  // price: number().min(1, { message: "Price is required" }),
  // language: string().nonempty({ message: "Language is required" }),
  language: string().optional(),
  user: string().optional(),
});
