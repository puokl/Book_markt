import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts, deleteProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productType } from "../types/productType";
import { useParams } from "react-router-dom";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();

  const { products, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );
  console.log("typeof>>>>>>>", typeof products === "object");

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Text>Hi from product list</Text>

      {console.log("product in jsx", products)}
      {console.log("product in productlist", products)}
      {/* {typeof product !== "object" && */}
      {products &&
        products.map((item: productType, index: number) => (
          <Flex key={index}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>

            <Text>ProductId: {item.productId}</Text>
            <Text>User: {item.user}</Text>
            <Button onClick={() => navigate(`/product/${item.productId}`)}>
              Product
            </Button>
          </Flex>
        ))}
    </>
  );
};
export default ProductList;
