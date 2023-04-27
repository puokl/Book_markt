import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";

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
      setRegisterError(e.message);
    }

    console.log("values", values);
  }
  console.log("errors", { errors });
  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message?.toString()}</p>
        </div>
        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
          />
          <p>{errors.name?.message?.toString()}</p>
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <p>{errors.password?.message?.toString()}</p>
        </div>
        <div className="form-element">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message?.toString()}</p>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}

export default RegisterPage;