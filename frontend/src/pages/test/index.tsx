import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";

const index: React.FC = () => {
  const { state } = useContext(AuthContext);
  console.log("state on test", state.user);
  // const {username} = state
  // console.log("dispatch on test", dispatch);
  return (
    <>
      <div>Have a good coding</div>
      <div></div>
      {/* {console.log(state)} */}
    </>
  );
};
export default index;
