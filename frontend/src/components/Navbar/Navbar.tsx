import { useContext, useEffect, useState } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

interface UserData {
  username: string;
  email: string;
}

const Navbar: React.FC = () => {
  // const { state } = useContext(AuthContext);
  //   console.log("state on test", state?.user?.username);

  //   const [data, setData] = useState<UserData>({ username: "", email: "" });
  //   console.log("data on useeffect", data);
  //   // const {username} = state
  //   // console.log("dispatch on test", dispatch);
  //   useEffect(() => {
  //     setData(state.user || { username: "", email: "" });
  //   }, [state.user]);
  return (
    <>
      <Flex justifyContent="space-between">
        <Link href="/">Home</Link>
        {/* <Flex>
        <Link href="/auth/login">login</Link>
        <Button as="a" href="/auth/login">
          Login
        </Button>
      </Flex> */}
        <Flex alignItems="center">
          <Button as="a" href="/auth/login">
            Login
          </Button>
          <Text>OR</Text>
          <Button as="a" href="/auth/register">
            Register
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default Navbar;
