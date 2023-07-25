import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";

type SideBarProps = {};

const SideBar: React.FC<SideBarProps> = () => {
  const { products, isLoading } = useAppSelector((state: any) => state.product);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex direction="column" bg="gray.100" h="100%" p={3}>
        <Text>Hi from SideBar</Text>
        <Text as="em">There are: {products.length} books</Text>
      </Flex>
    </>
  );
};
export default SideBar;
