import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";

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
  // const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  // const { login } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const handleClick = async (values: CreateSessionInput) => {
    console.log("clicked");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        {
          withCredentials: true,
        }
      );

      //FIXME -  prevent going back to login, it works only once
      router.replace("/");
    } catch (error: any) {
      setLoginError(error.message);
      console.log("handleClick() error", error);
    }
  };

  // async function onSubmit(values: CreateSessionInput) {
  //   try {
  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
  //       values,
  //       { withCredentials: true }
  //     );
  //   } catch (e: any) {
  //     setLoginError(e.message);
  //   }

  //   console.log("values", values);
  // }

  const googleUr = getGoogleOAuthURL();
  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(handleClick)}>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <p>{errors.password?.message?.toString()}</p>
        </div>

        <button type="submit">SUBMIT</button>
        <p>Or login with Google</p>
        <a href={googleUr}>Login with Google</a>
      </form>
    </>
  );
}

export default LoginPage;
