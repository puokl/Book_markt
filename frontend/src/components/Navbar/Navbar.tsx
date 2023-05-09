import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import Login from "./Login/Login";

interface UserData {
  username: string;
  email: string;
}

const Navbar: React.FC = () => {
  const { state } = useContext(AuthContext);
  //   console.log("state on test", state?.user?.username);

  //   const [data, setData] = useState<UserData>({ username: "", email: "" });
  //   console.log("data on useeffect", data);
  //   // const {username} = state
  //   // console.log("dispatch on test", dispatch);
  //   useEffect(() => {
  //     setData(state.user || { username: "", email: "" });
  //   }, [state.user]);
  return (
    <>
      <div>Hi from navbar</div>
      {/* <Login data={data} /> */}
    </>
  );
};
export default Navbar;
