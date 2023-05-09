import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const index: React.FC = () => {
  const { state } = useContext(AuthContext);
  const { isLoggedIn, username, email } = state;
  const [hydrated, setHydrated] = useState(false);

  console.log("state on test test", state);

  // to prevent hydration error
  useEffect(() => {
    setHydrated(true);
  }, [state.isLoggedIn]);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  // const username = state?.username;
  // const email = state?.email;

  return (
    <>
      <div>Have a good coding {username}!</div>
      <div>Email: {email}</div>
      {/* {console.log(state)} */}
    </>
  );
};

export default index;
