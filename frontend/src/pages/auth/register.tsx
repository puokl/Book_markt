import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";

const createUserSchema = object({
  name: string().nonempty({
    message: "Name is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({ message: "Password is required" }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string()
    .email("Not a valid email")
    .nonempty({ message: "Email is required" }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "paswords do not match",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values
      );
      router.push("/");
    } catch (e: any) {
      console.log("e", e);
      console.log("there is an error on the registration");
      setRegisterError(e.response.data);
    }

    console.log("values", values);
  }
  console.log("errors", { errors });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email")}
          />
          <Text as="p">{errors.email?.message?.toString()}</Text>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
          />
          <Text as="p">{errors.name?.message?.toString()}</Text>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <Text as="p">{errors.password?.message?.toString()}</Text>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("passwordConfirmation")}
          />
          <Text as="p">{errors.passwordConfirmation?.message?.toString()}</Text>
          <Text as="p">{registerError}</Text>
          <Button type="submit">SUBMIT</Button>
        </FormControl>
      </form>
    </>
  );
}

export default RegisterPage;
