import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const index: React.FC = () => {
  const { user } = useContext(AuthContext);
  //   const [hydrated, setHydrated] = useState(false);
  // const { isLoggedIn, username, email } = state;
  console.log("state on user test", user);

  //   // to prevent hydration error
  //   useEffect(() => {
  //     setHydrated(true);
  //   }, [state.isLoggedIn]);

  //   if (!hydrated) {
  //     return <div>Loading...</div>;
  //   }

  // const username = state?.username;
  // const email = state?.email;

  return (
    <>
      <div>Have a good coding !</div>
      <div>Email: </div>
      {/* {console.log(state)} */}
    </>
  );
};

export default index;
