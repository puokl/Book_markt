import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const index: React.FC = () => {
  const { state } = useContext(AuthContext);
  //   console.log("state on test", state?.user?.username);

  //   const [username, setUsername] = useState("");
  //   // const {username} = state
  //   // console.log("dispatch on test", dispatch);
  //   useEffect(() => {
  //     setUsername(state?.user?.username || "");
  //   }, [state]);

  return (
    <>
      <div>Have a good coding !</div>
      <div></div>
      {/* {console.log(state)} */}
    </>
  );
};

export default index;
