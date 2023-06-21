import { Text, Button, Flex, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UserType } from "../types/userType";
import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import fetcher from "../utils/fetcher";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ProductList from "./ProductList";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [userState, setUserState] = useState<UserType | null>(null);

  const { data } = useSwr<UserType | null>(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/me`,
    fetcher
  );

  useEffect(() => {
    console.log("data", data);
    console.log("user", user);
    if (data) {
      setUserState(data);
    }
  }, [data?.name]);

  return user ? (
    <>
      <Box minHeight="300px" bg="gray.300">
        <Text>HI {user.user.name}</Text>
        <Text>User is logged in</Text>
        <Button as="a" href="/product">
          Product
        </Button>
        <Button as="a" href="/user">
          User
        </Button>
      </Box>
      <ProductList />
      <Button as="a" href="/test">
        test
      </Button>
      <Button as="a" href="/testo">
        testo
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
