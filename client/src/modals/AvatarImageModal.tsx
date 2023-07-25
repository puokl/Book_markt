import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { uploadImage } from "../redux/slices/imageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type AvatarImageModalProps = {};

const AvatarImageModal: React.FC<AvatarImageModalProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    try {
      dispatch(uploadImage(selectedFile));
    } catch (error: any) {
      console.log("handleSubmitAvatar() error", error);
    }
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };
  return (
    <>
      <Text
        as="button"
        onClick={onOpen}
        m={1}
        fontWeight="bold"
        _hover={{ color: "gray.500" }}
      >
        Add a picture
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your avatar</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmitAvatar();
              }}
            >
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleAttachFile}
              />
              <button type="submit">send picture</button>
            </form>
            {/* <Button onClick={handleSubmitAvatar}>Add Avatar</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AvatarImageModal;
