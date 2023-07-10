import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Search from "../components/search/Search";

type TestProps = {};

const Test: React.FC<TestProps> = () => {
  return (
    <>
      <Text>That's the test page</Text>
      <Search />
      <Button>
        <Link to="/">homepage!</Link>
      </Button>
    </>
  );
};
export default Test;
