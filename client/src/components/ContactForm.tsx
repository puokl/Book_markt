import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { createChatSchema } from "../schema/chatSchema";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { createChat } from "../redux/slices/chatSlice";
import { chatInputType, chatType, conversationType } from "../types/chatType";

type ContactFormProps = {
  productId: string;
  seller: string;
  closeModal: () => void;
  title: string;
};

type CreateChatInput = TypeOf<typeof createChatSchema>;

const ContactForm: React.FC<ContactFormProps> = ({
  productId,
  seller,
  closeModal,
  title,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const sender = user.user._id;
  console.log("user", user.user._id);
  console.log("productId", productId);
  console.log("seller", seller);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateChatInput>({
    resolver: zodResolver(createChatSchema),
  });

  const handleChat = (values: chatInputType) => {
    try {
      const conversation: conversationType = {
        ...values,
        sender,
        productId,
        seller,
        title,
      };
      dispatch(createChat({ conversation, sender, productId, seller, title }));
      console.log("props", { conversation, sender, productId, seller, title });
      closeModal();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Text>Hello from ContactForm</Text>
      <FormControl as="form" onSubmit={handleSubmit(handleChat)}>
        <FormLabel>
          Message:
          <Input
            id="message"
            type="text"
            placeholder="hello"
            {...register("message")}
          />
          <Text as="p">{errors?.message?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Name:
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
          />
          <Text as="p">{errors?.name?.message?.toString()}</Text>
        </FormLabel>
        <FormLabel>
          Telephone:
          <Input
            id="telephone"
            type="text"
            placeholder="00 - 000"
            {...register("telephone", { valueAsNumber: true })}
          />
          <Text as="p">{errors?.telephone?.message?.toString()}</Text>
        </FormLabel>
        <Flex>
          <Button type="submit">Save</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </Flex>
      </FormControl>
    </>
  );
};
export default ContactForm;
