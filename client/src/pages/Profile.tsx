import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { uploadAvatar } from "../redux/slices/imageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProfile } from "../redux/slices/authSlice";

type TestoProps = {};

const Profile: React.FC<TestoProps> = () => {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const { avatar } = useAppSelector((state: any) => state.image);
  const { product } = useAppSelector((state: any) => state.product);

  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    try {
      console.log("file", selectedFile);
      dispatch(uploadAvatar(selectedFile));
    } catch (error: any) {
      console.log("handleSubmitAvatar() error", error);
    }
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };

  const handleProfile = () => {
    const data = { avatar: avatar, userId: user.user._id };
    dispatch(updateProfile(data));
    console.log("user after dispatch", user);
  };
  return (
    <>
      <Text>That's the testo page</Text>
      <Text>Hi {user?.user.name}</Text>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitAvatar();
        }}
      >
        <input type="file" name="file" id="file" onChange={handleAttachFile} />
        <button type="submit">send picture</button>
      </form>
      <button onClick={() => handleProfile()}>Update profile</button>
    </>
  );
};
export default Profile;
