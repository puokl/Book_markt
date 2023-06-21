import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, reset } from "../redux/slices/authSlice";
import axios from "axios";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  async function logOut() {
    try {
      dispatch(logout());
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
  return (
    <>
      <Flex justifyContent="space-around" bg="cyan.700">
        <Box>
          <Box boxSize="60px">
            <Link to="/">
              <Image src="/public/kenny.png" />
            </Link>
          </Box>
        </Box>
        {user ? (
          <Box as="main">
            <Flex>
              <Button onClick={logOut}>Logout</Button>
              <Button onClick={getSession}>getSession</Button>
            </Flex>
          </Box>
        ) : (
          <Button as="a" href="/login">
            Login
          </Button>
        )}
      </Flex>
      <Outlet />
    </>
  );
};
export default Layout;
