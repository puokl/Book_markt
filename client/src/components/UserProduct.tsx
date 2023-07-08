import { Button, Flex, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { deleteProduct, getAllUserProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
type UserProductProps = {};

const UserProduct: React.FC<UserProductProps> = () => {
  const dispatch = useAppDispatch();

  const { products, product, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(getAllUserProduct());
  }, []);
  return (
    <>
      <Flex m={4}>Hello from UserProduct</Flex>
      {product &&
        product.map((item: any, index: number) => (
          <Flex key={index} m={4}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>

            <Text>ProductId: {item.productId}</Text>
            <Text>User: {item.user}</Text>
            <Button onClick={() => handleDelete(item.productId)}>Delete</Button>
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
export default UserProduct;
