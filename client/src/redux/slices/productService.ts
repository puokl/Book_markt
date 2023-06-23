import axios from "axios";
import { productType } from "../../types/productType";

type temporaryCreateProductType = {
  title: string;
  author: string;
  price: number;
  language: string;
};
// create new product
const createProduct = async (productData: temporaryCreateProductType) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products`,
    productData,
    { withCredentials: true }
  );
  return response.data;
};

// get single product
const getSingleProduct = async (productId: any) => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products/${productId}`,

    { withCredentials: true }
  );
  return response.data;
};

// get all products
const getAllProduct = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products`,
    { withCredentials: true }
  );
  //FIXME - fix get product controller in backend, it seems miss middleware
  return response.data;
};

// get all product from user
//FIXME - create new controller
const getAllUserProduct = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/userproducts`,

    { withCredentials: true }
  );
  console.log("response", response);
  //FIXME - fix get product controller in backend, it seems miss middleware
  return response.data;
};

// delete a product
const deleteProduct = async (productId: any) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products/${productId}`,

    { withCredentials: true }
  );
  return response.data;
};

// update a single product
const updateProduct = async (productId: any) => {
  const response = await axios.put(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products/${productId}`,

    { withCredentials: true }
  );
  return response.data;
};

const productService = {
  getAllProduct,
  createProduct,
  getSingleProduct,
  getAllUserProduct,
  deleteProduct,
  updateProduct,
};
export default productService;
