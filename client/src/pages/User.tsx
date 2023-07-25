import UserProfile from "../components/UserProfile";
import UserProduct from "../components/UserProduct";
import { Flex } from "@chakra-ui/react";

type UserProps = {};

const User: React.FC<UserProps> = () => {
  return (
    <>
      <UserProfile />
      <UserProduct />
    </>
  );
};
export default User;
