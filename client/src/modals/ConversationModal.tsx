import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import ConversationForm from "../components/ConversationForm";

type ConversationModalProps = {
  buttonText: string;
  sender: string;
  seller: string;
  chatId: string;
  productId: string;
  name: string;
};

const ConversationModal: React.FC<ConversationModalProps> = ({
  buttonText,
  sender,
  seller,
  chatId,
  productId,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={openModal} w="150px">
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <ConversationForm
              chatId={chatId}
              sender={sender}
              seller={seller}
              productId={productId}
              name={name}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
