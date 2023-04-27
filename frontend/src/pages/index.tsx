import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import useSwr from "swr";
import fetcher from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";

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
  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );
  console.log("data", data);

  if (data) {
    return <div>Welcome! {data.name}</div>;
  }
  return (
    <>
      <div className={styles.container}>Please login</div>
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
