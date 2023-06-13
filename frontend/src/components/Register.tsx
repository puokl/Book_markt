import { Divider } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { string } from "zod";

type RegisterProps = {};
type UserType = {
  userName: string;
  email: string;
  password: string;
  avatar: string;
};

const Register: React.FC<RegisterProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<UserType>({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };

  const submitPicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:1337/api/users",
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        setNewUser({ ...newUser, avatar: result.avatar });
        console.log("result", result);
      }
      const result = await response.json();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <h2>Register</h2>
      <div>
        <form onSubmit={submitPicture}>
          <input type="file" name="file" onChange={handleAttachFile} />
          <button type="submit">send picture</button>
        </form>
        <div>User Info</div>
        {newUser && (
          <div>
            <img src="newUser.avatar" alt="avatar image" />
          </div>
        )}
      </div>
    </>
  );
};
export default Register;
