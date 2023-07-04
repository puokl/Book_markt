import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService";
import { chatType } from "../../types/chatType";

const initialState = {
  chat: [],
  singleChat: {},
  isLoading: true,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

type addConversationType = {};

// create new chat
export const createChat = createAsyncThunk(
  "chat/create",
  async (chatData: chatType, thunkAPI) => {
    try {
      console.log("trying to create chat");
      console.log("chatData", chatData);
      return await chatService.createChat(chatData);
    } catch (error: any) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error on create chat");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// get all chat from user
export const getAllUserChat = createAsyncThunk(
  "chat/getAllUserChat",
  async (_, thunkAPI) => {
    try {
      return await chatService.getAllUserChat();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add a conversation to the chat
export const addConversation = createAsyncThunk(
  "chat/addConversation",
  async (userInput, thunkAPI) => {
    try {
      const conversationData = userInput.conversation;
      const { chatId } = userInput;
      // console.log("chatId", chatId);
      // console.log("conversationData", conversationData);
      return await chatService.addConversation(conversationData, chatId);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// edit a message

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
      })
      .addCase(createChat.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllUserChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
      })
      .addCase(getAllUserChat.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.chat = action.payload;
        state.chat.push(action.payload);
        console.log("action.payload", action.payload);
      })
      .addCase(addConversation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
