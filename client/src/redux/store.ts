import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import chatReducer from "./slices/chatSlice";
import imageReducer from "./slices/imageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    chat: chatReducer,
    image: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
