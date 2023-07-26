import { Text, Flex, Box } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  // const [userState, setUserState] = useState<UserType | null>(null);

  // const { data } = useSwr<UserType | null>(
  //   `${import.meta.env.VITE_SERVER_ENDPOINT}/api/me`,
  //   fetcher
  // );

  return user ? (
    <>
      <Flex direction="row">
        <Box w="13%">
          <SideBar />
        </Box>
        <Box w="87%">
          <ProductList />
        </Box>
      </Flex>
    </>
  ) : (
    <>
      {/* h="13vh" on layout */}
      <Flex
        minHeight="87vh"
        bg="gray.300"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="b">Please log in to join our community!</Text>
      </Flex>
    </>
  );
};
export default Home;
