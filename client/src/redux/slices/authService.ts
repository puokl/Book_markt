// http requests and setting sessionStorage
import axios from "axios";
import { LoginType, RegisterType } from "../../types/authServiceType";

// Register
const registerUser = async (userData: RegisterType) => {
  console.log("ho from authservice");
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/users`,
    userData
  );
  console.log("hi from authservice");

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login
const login = async (userData: LoginType) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`,
    userData,
    {
      withCredentials: true,
    }
  );

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = async () => {
  await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`, {
    withCredentials: true,
  });
  sessionStorage.removeItem("user");
};

const authService = {
  registerUser,
  logout,
  login,
};

export default authService;
