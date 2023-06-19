import { Inter } from "next/font/google";
import useSwr from "swr";
import fetcher from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button, ButtonGroup, Flex, Text, Box } from "@chakra-ui/react";
import { UserType } from "@/types/userType";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage<{ fallbackData: UserType }> = ({ fallbackData }) => {
  const [userState, setUserState] = useState<UserType | null>(fallbackData);
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const { data } = useSwr<UserType | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  useEffect(() => {
    console.log("fallbackData", fallbackData);
    console.log("data", data);
    if (data) {
      setUser(data);
      setUserState(data);
    }
    // if (data) {
    //   dispatch({
    //     type: "LOGIN",
    //     payload: { username: data?.name, email: data?.email, isLoggedIn: true },
    //   });
    // } else {
    //   dispatch({
    //     type: "FAILURE",
    //     payload: {
    //       // username: data!.name,
    //       // email: data!.email,
    //       username: undefined,
    //       email: undefined,
    //       isLoggedIn: false,
    //     },
    //   });
    // }
  }, [data?.name]);

  async function logOut() {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        {
          withCredentials: true,
        }
      );

      setUserState(null);
      localStorage.removeItem("user");
      // dispatch({
      //   type: "LOGOUT",
      //   payload: {
      //     username: data!.name,
      //     email: data!.email,
      //     isLoggedIn: false,
      //   },
      // });
      router.push("/");
    } catch (error: any) {
      console.log("error on logOut()", error);
    }
  }

  async function getSession() {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        {
          withCredentials: true,
        }
      );
      // console.log("getSession data", data);
    } catch (error: any) {
      console.log("error on getSession()", error);
    }
  }

  if (userState) {
    // console.log("data && data.session", testState.session);
    return (
      <>
        <Flex justifyContent="space-evenly">
          <Text>Welcome! {userState.name}</Text>
          <Box>
            <Button onClick={logOut}>Logout</Button>
            <Button onClick={getSession}>getSession</Button>
          </Box>
        </Flex>
        <Button as="a" href="/testo">
          testo
        </Button>
        <Button as="a" href="/user">
          user
        </Button>
        <Text>
          Read <Link href="/test">this page!</Link>
        </Text>
      </>
    );
  }
  return (
    <>
      <Text>Hello!</Text>
    </>
  );
};

// fetching data on the server and to populate useSwr

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );
  // console.log("context.req", context.req);
  return { props: { fallbackData: data } };
};

export default Home;
