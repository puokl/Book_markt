import { Inter } from "next/font/google";
import useSwr from "swr";
import fetcher from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

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
  const [testState, setTestState] = useState<User | null>(fallbackData);
  const router = useRouter();
  console.log("testState", testState);

  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );
  console.log("data before delete", data);

  async function logOut() {
    try {
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        {
          withCredentials: true,
        }
      );

      setTestState(null);
      console.log("session deleted");

      console.log("data after delete", data);
      localStorage.removeItem("user");
      router.push("/");
      // redirect("/");
      console.log("redirect works");
    } catch (error: any) {
      // console.log("accessToken", accessToken);
      console.log("there was an error on delete session");
      console.log(error);
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

      console.log("data from getSession", data);
    } catch (error: any) {
      console.log("there was an error on get session");
      console.log("error", error);
    }
  }

  if (testState) {
    console.log("data && data.session", testState.session);
    return (
      <>
        <div>Welcome! {testState.name}</div>
        <button onClick={logOut}>Delete session</button>
        <button onClick={getSession}>getSession</button>
        <h1 className="title">
          Read <Link href="/test">this page!</Link>
        </h1>
      </>
    );
  }
  return (
    <>
      <div>Please login to visit the website</div>
      <a href="/auth/login">Login</a>
    </>
  );
};

// when we refresh the page it only loads me on the client and we see the please login flash up
// so we want to render this on the server
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );
  return { props: { fallbackData: data } };
};
// it fetches data on the server and we can populate useSwr with this data

export default Home;
