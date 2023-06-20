import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type TestProps = {};

const Test: React.FC<TestProps> = () => {
  return (
    <>
      <Text>That's the test page</Text>
      <Button>
        <Link to="/">homepage!</Link>
      </Button>
    </>
  );
};
export default Test;
