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

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Text>Hi from product list</Text>

      {console.log("product in jsx", products)}
      {console.log("product in productlist", products)}

      {products &&
        products.map((item: productType, index: number) => (
          <Flex
            key={index}
            bg="yellow.100"
            border="1px solid red"
            direction="column"
          >
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>ProductId: {item.productId}</Text>
            <Text>User: {item.user}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Language: {item.language}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Condition: {item.condition}</Text>
            <Text>Year: {item.year}</Text>
            <Text>Pages: {item.pages}</Text>

            <Button
              onClick={() => navigate(`/product/${item.productId}`)}
              maxWidth="100px"
            >
              Product
            </Button>
          </Flex>
        ))}
    </>
  );
};
export default ProductList;
