import axios from "axios";
import { chatType, conversationType } from "../../types/chatType";

// create new chat
const createChat = async (chatData: chatType) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/api/chat`,
      chatData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

// get all chat from user
const getAllUserChat = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/chat/received`,
    { withCredentials: true }
  );
  console.log("response", response);
  return response.data;
};

// add conversation
const addConversation = async (
  // conversationData: Omit<conversationType, "telephone">,
  conversationData: conversationType,
  chatId: string
) => {
  console.log("conversationData", conversationData);
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/chat/${chatId}`,
    conversationData,
    { withCredentials: true }
  );
  console.log("response.data", response.data);
  return response.data;
};

const chatService = {
  createChat,
  getAllUserChat,
  addConversation,
};

export default chatService;
