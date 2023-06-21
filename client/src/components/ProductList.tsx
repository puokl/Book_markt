import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productType } from "../types/productType";

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { product, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(getAllProducts());
    console.log("product", product);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Text>Hi from product list</Text>

      {console.log("product in jsx", product)}
      {product &&
        product.map((item: productType, index: number) => (
          <Flex key={index}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
          </Flex>
        ))}
    </>
  );
};
export default ProductList;
