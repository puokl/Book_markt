import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import chatReducer from "./slices/chatSlice";
import imageReducer from "./slices/imageSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    chat: chatReducer,
    image: imageReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
