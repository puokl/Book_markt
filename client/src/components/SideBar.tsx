import { Button, Flex, Spinner, Text, Image, Box } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";

type SideBarProps = {};

const SideBar: React.FC<SideBarProps> = () => {
  const { products, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.product
  );

  return (
    <>
      <Text>Hi from SideBar</Text>
      <Flex direction="column" bg="gray.100" h="100%" p={3}>
        <Text>Hi</Text>
        <Text>Hello</Text>
        <Text>There are: {products.length} books</Text>
      </Flex>
    </>
  );
};
export default SideBar;
