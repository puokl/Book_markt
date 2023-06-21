import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  product: null,
  isLoading: true,
  isError: false,
  isSuccess: false,
};

// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (user, thunkAPI) => {
    try {
      return await productService.getAll();
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
