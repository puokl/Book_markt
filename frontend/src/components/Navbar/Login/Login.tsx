import React from "react";

type User = {
  username: string;
  email: string;
};
type LoginProps = {
  data: User;
};

const Login: React.FC<LoginProps> = ({ data }) => {
  console.log("data from login", data);
  const { username, email } = data;
  //   const username = data.data.user.username;
  //   const email = data.data.user.email;
  return (
    <>
      <div>Have a good coding</div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
    </>
  );
};
export default Login;
