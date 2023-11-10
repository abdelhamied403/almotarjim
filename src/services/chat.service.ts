import Chat from "@/interfaces/chat";
import { api } from "./api";

const getAllChats = async () => {
  const res = await api.get("/messages/chats");
  return res.data.data;
};

const getSingleChat = async (id?: string) => {
  const res = await api.get(`/messages/show/${id}`);
  return res.data.data;
};
const createChat = async (data: Partial<Chat>) => {
  const res = await api.post(`/messages/create-chat`, data);
  return res.data.data;
};
const closeChat = async (id?: string) => {
  const res = await api.get(`/messages/close-chat/${id}`);
  return res.data.data;
};
const sendMessage = async (message: string, chatId: string) => {
  const res = await api.post(`/messages/chat/send`, {
    content: message,
    chat_id: chatId,
  });
  return res.data.data;
};

const ChatService = {
  getAllChats,
  getSingleChat,
  createChat,
  closeChat,
  sendMessage,
};

export default ChatService;
