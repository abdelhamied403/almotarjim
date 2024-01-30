import Chat from "@/interfaces/chat";
import { api, formAxios } from "./api";

const getAllChats = async (page: number) => {
  const res = await api.get(`/messages/chats?page=${page}`);
  return res.data.data;
};

const getSingleChat = async (id?: string, page: number = 1) => {
  const res = await api.get(`/messages/show/${id}?page=${page}`);
  return res.data;
};
const createChat = async (data: Partial<Chat>) => {
  const res = await api.post(`/messages/create-chat`, data);
  return res.data.data;
};
const closeChat = async (id?: string) => {
  const res = await api.get(`/messages/close-chat/${id}`);
  return res.data.data;
};
const sendMessage = async (
  message: { type: string; content: any },
  chatId: string
) => {
  if (["voice", "file"].includes(message.type)) {
    const config = {
      headers: {
        "Content-Type":
          "multipart/form-data; charset=utf-8; boundary=" +
          Math.random().toString().substr(2),
      },
    };

    const res = await formAxios.post(
      `/messages/chat/send`,
      {
        ...message,
        chat_id: chatId,
      },
      config
    );
    return res.data.data;
  } else {
    const res = await api.post(`/messages/chat/send`, {
      ...message,
      chat_id: chatId,
    });
    return res.data.data;
  }
};

const ChatService = {
  getAllChats,
  getSingleChat,
  createChat,
  closeChat,
  sendMessage,
};

export default ChatService;
