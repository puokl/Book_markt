import { Box, Button, Flex, Text, Image, Avatar } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, reset } from "../redux/slices/authSlice";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import Search from "../components/search/Search";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // const { avatar } = useAppSelector((state) => state.image);
  async function logOut() {
    try {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    } catch (error: any) {
      console.log("error on logOut()", error);
    }
  }
  // async function getSession() {
  //   try {
  //     const data = await axios.get(
  //       `${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("getSession data", data);
  //     console.log("user", user);
  //   } catch (error: any) {
  //     console.log("error on getSession()", error);
  //   }
  // }

  return (
    <>
      {console.log("user", user)}
      <Flex justifyContent="space-around" bg="cyan.700">
        <Flex>
          <Box boxSize="60px">
            <Link to="/">
              <Image src="/kenny.png" />
            </Link>
          </Box>
          <Search />
        </Flex>
        {user ? (
          <Box as="main">
            <Flex>
              <Text>Your are logged in as: </Text>
              <Text as="b">{user?.user.email}</Text>

              {/* //SECTION */}
              <Box
                as="span"
                position="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Avatar name={user.user.name} src={user.user.image} />

                {isHovered && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    width="200px"
                    bg="gray.200"
                    border="1px solid gray"
                    boxShadow="md"
                    p={1}
                    borderRadius="md"
                  >
                    <Flex direction="column" alignItems="center">
                      <Text
                        as="a"
                        href="/addproduct"
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Add a product
                      </Text>
                      <Text
                        as="a"
                        href="/user"
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Your products
                      </Text>
                      <Text
                        as="a"
                        href={`/messages/received/${user.user._id}`}
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Your Messages
                      </Text>
                      <Text
                        as="a"
                        href="/profile"
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                      >
                        Update Avatar
                      </Text>

                      <Flex
                        as="button"
                        onClick={logOut}
                        m={1}
                        fontWeight="bold"
                        _hover={{ color: "gray.500" }}
                        alignItems="center"
                      >
                        {" "}
                        <TbLogout style={{ marginRight: "5px" }} />
                        <Text>Logout</Text>
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
              {/* //SECTION - */}
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
