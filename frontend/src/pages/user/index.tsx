import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import fetcher from "@/utils/fetcher";
import { UserType } from "@/types/userType";
import useSwr from "swr";
import { Button } from "@chakra-ui/react";

type indexProps = {};

const index: NextPage<{ fallbackData: UserType }> = ({ fallbackData }) => {
  const [userState, setUserState] = useState<UserType | null>(fallbackData);

  const { data } = useSwr<UserType | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  return (
    <>
      <div>Have a good coding</div>
      <div>{data?.name}</div>
      <Button as="a" href="/">
        home
      </Button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );
  // console.log("context.req", context.req);
  return { props: { fallbackData: data } };
};
export default index;
