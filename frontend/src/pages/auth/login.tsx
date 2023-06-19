import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";

const createSessionSchema = object({
  email: string().nonempty({
    message: "Email is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const handleLogin = async (values: CreateSessionInput) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        {
          withCredentials: true,
        }
      );
      console.log("response", response);
      localStorage.setItem("user", response.data.user.name);
      router.replace("/");
    } catch (error: any) {
      setLoginError(error.message);
      console.log("handleClick() error", error);
    }
  };

  const googleUr = getGoogleOAuthURL();
  return (
    <>
      <Flex maxWidth="400px" direction="column" alignItems="center">
        <Text as="p">{loginError}</Text>

        <FormControl as="form" isRequired onSubmit={handleSubmit(handleLogin)}>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email")}
          />
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <Text as="p">{errors.password?.message?.toString()}</Text>
          <Button type="submit">SUBMIT</Button>
          <Text as="p">Or login with Google</Text>
          <Button as="a" href={googleUr}>
            Google Login
          </Button>
          {/* <Text as="a" href={googleUr}>
              Login with Google
            </Text> */}
        </FormControl>
      </Flex>
    </>
  );
}

export default LoginPage;
