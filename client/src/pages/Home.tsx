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

  // useEffect(() => {
  //   if (data) {
  //     setUserState(data);
  //   }
  // }, [data?.name]);

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
      <Box minHeight="300px" bg="gray.300">
        <Text>Hello!</Text>
        <Text>Please log in</Text>
      </Box>
    </>
  );
};
export default Home;
