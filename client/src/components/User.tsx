import UserProfile from "./UserProfile";
import UserProduct from "./UserProduct";
import { Flex } from "@chakra-ui/react";

type UserProps = {};

const User: React.FC<UserProps> = () => {
  return (
    <>
      <Flex>Hello from user</Flex>
      <UserProfile />
      <UserProduct />
    </>
  );
};
export default User;
