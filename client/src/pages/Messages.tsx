import { Text, Flex, Box, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import React, { useEffect } from "react";
import {
  getAllReceivedUserChat,
  getAllSentUserChat,
} from "../redux/slices/chatSlice";
import ConversationModal from "../modals/ConversationModal";
import { chatType, conversationType } from "../types/chatType";

type MessagesProps = {};

const Messages: React.FC<MessagesProps> = () => {
  const dispatch = useAppDispatch();

  const { receivedChat, sentChat, isLoading, isError, isSuccess } =
    useAppSelector((state: any) => state.chat);

  const params = useParams();

  const user = params.userId;

  useEffect(() => {
    // console.log("user.user.id", user.user._id);

    dispatch(getAllReceivedUserChat());
    dispatch(getAllSentUserChat());

    console.log("Messages reloaded");
    console.log("receivedChat in useEffect", receivedChat);
    console.log("sentChat in useEffect", sentChat);
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Text>Hi from messages</Text>
      <Text>I'm {user}</Text>
      <Box>
        {console.log("chat", receivedChat)}
        {console.log("sentChat", sentChat)}
        {sentChat &&
          sentChat.map((item: chatType, index: number) => {
            return (
              <Flex
                key={item._id}
                borderWidth="1px"
                borderRadius="md"
                m={4}
                direction="column"
              >
                <Text>Product: {item.productId}</Text>
                <Text>Product: {item.title}</Text>
                {item.conversation.map(
                  (message: conversationType, innerIndex: number) => {
                    return (
                      <Flex key={message._id} direction="column">
                        <Text fontWeight="bold">Name: {message?.name}</Text>
                        <Text>Message: {message?.message}</Text>
                        <Text>Telephone: {message?.telephone}</Text>
                      </Flex>
                    );
                  }
                )}
                <ConversationModal
                  buttonText="Reply"
                  chatId={item._id}
                  sender={item.sender}
                  seller={item.seller}
                  name={item.name}
                  productId={item.productId}
                />
              </Flex>
            );
          })}
      </Box>
    </>
  );
};
export default Messages;
