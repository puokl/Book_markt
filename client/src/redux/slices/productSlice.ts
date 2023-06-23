import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import productService from "./productService";
import { productType } from "../../types/productType";

const initialState = {
  product: [],
  products: [],
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: "",
};

type temporaryCreateProductType = {
  title: string;
  author: string;
  price: number;
  language: string;
};
// create new product
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: temporaryCreateProductType, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
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

// get single product
export const getSingleProduct = createAsyncThunk(
  "product/getSingle",
  async (productId, thunkAPI) => {
    try {
      return await productService.getSingleProduct(productId);
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

// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProduct();
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

// get all products from user
//FIXME - create new controller
export const getAllUserProduct = createAsyncThunk(
  "product/getAllUserProduct",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllUserProduct();
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
// delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(productId);

      //NOTE -

      return { response, productId };
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.updateProduct(productId);

      //NOTE -

      return { response, productId };
    } catch (error: any) {
      const message: string =
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
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.product.push(action.payload);
        state.product = action.payload;
        console.log("state.product", state.product);
        console.log("action.payload", action.payload);
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.product.push(action.payload);
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllUserProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(getAllUserProduct.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const ID = action.payload.productId;
        state.isLoading = false;
        state.isSuccess = true;

        state.product = current(state).product.filter(
          (item) => item.productId !== ID
        );
        console.log("state.product", state.product);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product.push(action.payload);
        // state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export default productSlice.reducer;
