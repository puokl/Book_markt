import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

type TestoProps = {};

const Testo: React.FC<TestoProps> = () => {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const { product } = useAppSelector((state: any) => state.product);
  useEffect(() => {
    console.log("user", user);
    console.log("isLoading", isLoading);
    console.log("product", product);
  }, []);

  return (
    <>
      <Text>That's the testo page</Text>
      <Text>Hi {user.user.name}</Text>
      <Button>
        <Link to="/">homepage!</Link>
      </Button>
    </>
  );
};
export default Testo;
