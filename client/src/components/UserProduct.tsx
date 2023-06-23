import { Button, Flex, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { deleteProduct, getAllUserProduct } from "../redux/slices/productSlice";
type UserProductProps = {};

const UserProduct: React.FC<UserProductProps> = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );

  const { user } = useAppSelector((state) => state.auth);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    console.log("first");
    console.log("user.user.id", user.user._id);

    dispatch(getAllUserProduct());
    console.log("second");
    console.log("product", products);
  }, []);
  return (
    <>
      <Flex>Hello from UserProduct</Flex>
      {products &&
        products.map((item: any, index: number) => (
          <Flex key={index}>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>

            <Text>ProductId: {item.productId}</Text>
            <Text>User: {item.user}</Text>
            <Button onClick={() => handleDelete(item.productId)}>Delete</Button>
          </Flex>
        ))}
    </>
  );
};
export default UserProduct;
