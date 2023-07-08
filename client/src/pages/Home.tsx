import { Text, Button, Flex, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UserType } from "../types/userType";
import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import fetcher from "../utils/fetcher";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { image } = useAppSelector((state) => state.image);

  const [userState, setUserState] = useState<UserType | null>(null);

  const { data } = useSwr<UserType | null>(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/me`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setUserState(data);
    }
  }, [data?.name]);

  return user ? (
    <>
      {/* <Box minHeight="300px" bg="gray.300">
        <Text>HI {user.user.name}</Text>
        <Text>User is logged in</Text>
        <Text>this is image {image}</Text>
        <Button as="a" href="/addproduct">
          Product
        </Button>
        <Button as="a" href="/user">
          User
        </Button>
        <Button onClick={() => navigate(`/messages/received/${user.user._id}`)}>
        
          Messages
        </Button>
      </Box> */}
      <Flex direction="row">
        <Box w="13%">
          <SideBar />
        </Box>
        <Box w="87%">
          <ProductList />
        </Box>
      </Flex>
      <Button as="a" href="/test">
        test
      </Button>
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
