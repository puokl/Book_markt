import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import ContactForm from "../components/ContactForm";

type ContactModalProps = {
  buttonText: string;
  productId: string;
  seller: string;
  title: string;
};

const ContactModal: React.FC<ContactModalProps> = ({
  buttonText,
  productId,
  seller,
  title,
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
      <Button onClick={openModal}>{buttonText}</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactForm
              productId={productId}
              seller={seller}
              closeModal={closeModal}
              title={title}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ContactModal;
