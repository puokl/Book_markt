import { Box, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Box as="main">
      <Text>Hello from layout</Text>
      <Outlet />
    </Box>
  );
};
export default Layout;
