import Chat from "@/interfaces/chat";
import { api } from "./api";
import Message from "@/interfaces/message";

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
const sendMessage = async (data: Partial<Message>) => {
  const res = await api.post(`/messages/chat/send`, data);
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
