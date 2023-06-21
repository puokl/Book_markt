import axios from "axios";

// get all products
const getAll = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/products`
  );
  return response.data;
};

const productService = { getAll };
export default productService;
