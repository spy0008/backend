import { initializeSocketConnection } from "../services/chat.socket";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../services/chat.api.js";
import {
  setChat,
  setError,
  setLoading,
  setCurrentChatId,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../chat.slice.js";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));
      const data = await sendMessage({ message, chatId });
      const { aiMessage, chat } = data;
      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      }
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: message,
          role: "user",
        }),
      );
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
      dispatch(setCurrentChatId(chat._id));
      return data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      const { chats } = data;
      dispatch(
        setChat(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
              lastUpdated: chat.updatedAt,
            };

            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Get chats failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleOpenChat(chatId) {
    try {
      dispatch(setLoading(true));
      const data = await getMessages(chatId);

      const { messages } = data;

      const formatedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formatedMessages,
        }),
      );

      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      setError(error.response?.data?.message || "Get chat failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleChatDelete(chatId) {}

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
  };
};
