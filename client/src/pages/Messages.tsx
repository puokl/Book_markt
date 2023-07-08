import { Text, Button, Flex, Box, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getAllUserChat } from "../redux/slices/chatSlice";
import ConversationModal from "../modals/ConversationModal";

type MessagesProps = {};

const Messages: React.FC<MessagesProps> = () => {
  const dispatch = useAppDispatch();

  const { chat, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.chat
  );

  const params = useParams();

  const user = params.userId;

  useEffect(() => {
    // console.log("user.user.id", user.user._id);

    dispatch(getAllUserChat());

    console.log("Messages reloaded");
    console.log("chat", chat);
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <Text>Hi from messages</Text>
      <Text>I'm {user}</Text>
      <Box>
        {console.log("chat", chat)}
        {chat &&
          chat.map((item: any, index: number) => {
            return (
              <Flex
                key={item._id}
                borderWidth="1px"
                borderRadius="md"
                m={4}
                direction="column"
              >
                <Text>Product: {item.productId}</Text>
                {item.conversation.map((message: any, innerIndex: number) => {
                  return (
                    <>
                      <Flex key={message._id} direction="column">
                        <Text fontWeight="bold">Name: {message?.name}</Text>
                        <Text>Message: {message?.message}</Text>
                        <Text>Telephone: {message?.telephone}</Text>
                      </Flex>
                    </>
                  );
                })}
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
