import { object, string, number } from "zod";

export const createProductSchema = object({
  title: string().nonempty({ message: "Title is required" }),
  author: string().nonempty({ message: "Author is required" }),
  price: number().min(1, { message: "Price is required" }),
  language: string().nonempty({ message: "Language is required" }),
});
