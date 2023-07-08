import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { addConversation } from "../redux/slices/chatSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { createConversationSchema } from "../schema/chatSchema";
import { addConversationType } from "../types/chatType";
import { useNavigate } from "react-router-dom";

type ConversationFormProps = {
  sender: string;
  seller: string;
  chatId: string;
  productId: string;
  name: string;
};

type CreateConversationInput = TypeOf<typeof createConversationSchema>;
const ConversationForm: React.FC<ConversationFormProps> = ({
  sender,
  seller,
  chatId,
  productId,
  name,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // } = useForm();
  } = useForm<CreateConversationInput>({
    resolver: zodResolver(createConversationSchema),
  });

  const navigate = useNavigate();
  const handleConversation = (values: addConversationType) => {
    try {
      console.log("values", values);
      const conversation = {
        ...values,
        name,
        sender,
        seller,
        productId,
      };
      const userInput = { conversation, chatId };
      console.log("userInput", userInput);
      dispatch(addConversation(userInput));
      window.location.reload();
      //   navigate(`/messages/received/${user.user._id}`);
    } catch (error: any) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Text>Hello from ConversationForm</Text>
      <FormControl as="form" onSubmit={handleSubmit(handleConversation)}>
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
        <Button type="submit">Save</Button>
      </FormControl>
    </>
  );
};
export default ConversationForm;
