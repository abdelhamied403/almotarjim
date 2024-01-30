import { api, formAxios } from "./api";

const getInternalChats = async () => {
  const res = await api.get(`/chats/get-internal-chats`);
  return res.data.data;
};

const createInternalChat = async (id: string, page: number = 1) => {
  const res = await api.post(`/chats/create-internal-chat?page=${page}`, {
    receiver_id: id,
  });

  return res.data;
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
      `/chats/send-message`,
      {
        ...message,
        chat_id: chatId,
      },
      config
    );
    return res.data.data;
  } else {
    const res = await api.post(`/chats/send-message`, {
      ...message,
      chat_id: chatId,
    });
    return res.data.data;
  }
};

const InternalChatService = {
  getInternalChats,
  createInternalChat,
  sendMessage,
};

export default InternalChatService;
