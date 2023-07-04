import { Request, Response } from "express";
import { CreateMessageInput } from "../schema/message.schema";
import { createMessage } from "../service/message.service";

// @desc    Create a single chat
// @route   POST /api/chat/
// @access  Private
export async function createMessageHandler(
  req: Request<{}, {}, CreateMessageInput["body"]>,
  res: Response
) {
  try {
    const senderId = res.locals.user._id;
    const body = req.body;
    const chat = await createMessage({ ...body, sender: senderId });

    //SECTION -

    // await Chat.findByIdAndUpdate(
    //   chatId,
    //   { $push: { conversation: newMessage._id } },
    //   { new: true }
    // );

    //SECTION -
    return res.send(chat);
  } catch (error) {
    console.log("error", error);
  }
}
