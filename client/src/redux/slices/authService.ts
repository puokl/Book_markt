// for making http requests adn sending data back and setting localstorage
import axios from "axios";
import { LoginType, RegisterType } from "../../types/authServiceType";

// add proxy in package.json to direct it to server
// const API_URL = "/api/users";

// register user
const registerUser = async (userData: RegisterType) => {
  console.log("ho from authservice");
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/users`,
    userData
  );
  console.log("hi from authservice");

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: LoginType) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`,
    userData,
    {
      withCredentials: true,
    }
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/sessions`, {
    withCredentials: true,
  });
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  logout,
  login,
};

export default authService;
