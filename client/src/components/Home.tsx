import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UserType } from "../types/userType";
import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import fetcher from "../utils/fetcher";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, reset } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  //SECTION -
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  //SECTION -
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

  async function logOut() {
    try {
      // await axios.delete(
      //   `${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`,
      //   {
      //     withCredentials: true,
      //   }
      // );

      // setUserState(null);
      // localStorage.removeItem("user");
      // // dispatch(logout());
      console.log("first logout");
      dispatch(logout());
      console.log("second logout");
      dispatch(reset());

      navigate("/");
    } catch (error: any) {
      console.log("error on logOut()", error);
    }
  }

  async function getSession() {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`,
        {
          withCredentials: true,
        }
      );
      console.log("getSession data", data);
      console.log("user", user);
    } catch (error: any) {
      console.log("error on getSession()", error);
    }
  }

  return user ? (
    <>
      <Flex justifyContent="space-evenly">
        <Text>HI {user.user.name}</Text>
        {/* <Text>Welcome! {userState.name}</Text> */}
        <Box>
          <Button onClick={logOut}>Logout</Button>
          <Button onClick={getSession}>getSession</Button>
        </Box>
      </Flex>
      <Button as="a" href="/test">
        test
      </Button>
      <Button as="a" href="/testo">
        testo
      </Button>
    </>
  ) : (
    <>
      <Text>Hello!</Text>
      <Flex justifyContent="space-between">
        <Link to="/">Home</Link>
        <Flex alignItems="center">
          <Button as="a" href="/login">
            Login
          </Button>
          <Text>OR</Text>
          <Button as="a" href="/register">
            Register
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default Home;
