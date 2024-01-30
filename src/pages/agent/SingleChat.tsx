import Chat from "@/containers/Chat";
import usePusher from "@/hooks/usePusher";
import ChatType from "@/interfaces/chat";
import ChatService from "@/services/chat.service";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "@/interfaces/message";

const SingleChat = () => {
  const pusher = usePusher();
  const { id = "" } = useParams();
  const [chat, setChat] = useState<Partial<ChatType>>({});
  const [messages, setMessages] = useState<{ data: Array<Message> }>({
    data: [],
  });
  const [page, setPage] = useState(1);

  const getChat = useCallback(async () => {
    const res = await ChatService.getSingleChat(id);
    setChat(res.data);
    setMessages(res.messages);
  }, [id]);

  const handleSend = useCallback(
    async (message: { type: string; content: any }) => {
      await ChatService.sendMessage(message, id);
    },
    [id]
  );

  const onFetchMore = async () => {
    const res = await ChatService.getSingleChat(id, page + 1);
    setPage((prev) => prev + 1);
    setMessages((prev) => ({
      ...prev,
      ...res.messages,
      data: [...prev.data, ...res.messages.data],
    }));
  };

  useEffect(() => {
    const channel = pusher.subscribe(`chat.${id}`);
    channel.bind("message-sent", (data: any) => {
      setMessages((prev: any) => ({ ...prev, data: [data, ...prev.data] }));
    });

    return () => {
      channel.unbind("message-sent");
    };
  }, [id, pusher]);

  useEffect(() => {
    getChat();
  }, [getChat]);

  return (
    <Chat {...chat} messages={messages} onSend={handleSend}>
      <Chat.Header>
        <Chat.Header.Title></Chat.Header.Title>
      </Chat.Header>
      <Chat.Body fetchMoreMessages={onFetchMore}></Chat.Body>
      <Chat.Footer />
    </Chat>
  );
};

export default SingleChat;
