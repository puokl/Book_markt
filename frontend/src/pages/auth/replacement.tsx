import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";
import { AuthContext } from "@/context/AuthContext";

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
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const handleGoogleLogin = async () => {
    getGoogleOAuthURL();
    try {
      // Make a request to your backend API endpoint that handles the Google OAuth flow
      const res = await axios.get("/api/sessions/oauth/google", {
        withCredentials: true,
      });

      // Dispatch the LOGIN_SUCCESS action with the user's details
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          username: res.data.user.name,
          email: res.data.user.email,
        },
      });

      // Redirect the user to the home page
      router.replace("/");
    } catch (err: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response });
    }
  };

  const handleClick = async (values: CreateSessionInput) => {
    console.log("clicked");
    dispatch({ type: "LOGIN_START" });
    try {
      //REVIEW - fix server response
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        {
          withCredentials: true,
        }
      );
      // const { name, email } = res;
      // console.log('"name"', name);
      console.log("res.data", res.data.user.email);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { username: res.data.user.name, email: res.data.user.email },
      });
      console.log("handleClick good", res.data);
      console.log("dispatch.payload", dispatch);
      // prevent going back to login, it works only once
      router.replace("/");
    } catch (err: any) {
      console.log("handleClick failed");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  // async function onSubmit(values: CreateSessionInput) {
  //   try {
  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
  //       values,
  //       { withCredentials: true }
  //     );
  //     router.push("/");
  //   } catch (e: any) {
  //     setLoginError(e.message);
  //   }

  //   console.log("values", values);
  // }
  // console.log("errors", { errors });
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
        <button type="button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </form>
    </>
  );
}

export default LoginPage;
