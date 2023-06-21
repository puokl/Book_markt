import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../redux/hooks";

type UserProfileProps = {};

const UserProfile: React.FC<UserProfileProps> = () => {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) {
    <Spinner />;
  }
  return (
    <Box>
      <Text>Hello from user</Text>
      <Text>{user?.user.name}</Text>
    </Box>
  );
};
export default UserProfile;
