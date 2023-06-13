import { Inter } from "next/font/google";
import useSwr from "swr";
import fetcher from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button, ButtonGroup } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const [userState, setUserState] = useState<User | null>(fallbackData);
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  useEffect(() => {
    // console.log("data", data);
    if (data) {
      dispatch({
        type: "LOGIN",
        payload: { username: data?.name, email: data?.email, isLoggedIn: true },
      });
    } else {
      dispatch({
        type: "FAILURE",
        payload: {
          // username: data!.name,
          // email: data!.email,
          username: undefined,
          email: undefined,
          isLoggedIn: false,
        },
      });
    }
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

      dispatch({
        type: "LOGOUT",
        payload: {
          username: data!.name,
          email: data!.email,
          isLoggedIn: false,
        },
      });
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
      console.log("getSession data", data);
    } catch (error: any) {
      console.log("error on getSession()", error);
    }
  }

  if (userState) {
    // console.log("data && data.session", testState.session);
    return (
      <>
        <div>Welcome! {userState.name}</div>
        <Button onClick={logOut}>Delete session</Button>
        <Button onClick={getSession}>getSession</Button>
        <h1 className="title">
          Read <Link href="/test">this page!</Link>
        </h1>
      </>
    );
  }
  return (
    <>
      <div>Please login to visit the website</div>
      <Button>
        <a href="/auth/login">Login</a>
      </Button>
    </>
  );
};

// fetching data on the server and to populate useSwr

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );
  console.log("context.req", context.req);
  return { props: { fallbackData: data } };
};

export default Home;
