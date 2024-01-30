import { Button } from "@/components/ui/button";
import ChatType from "@/interfaces/chat";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import noRequestsImage from "@/assets/no-requests.svg";
import { useEffect, useState } from "react";
import usePusher from "@/hooks/usePusher";
import useUser from "@/hooks/useUser";
import Chat from "@/interfaces/chat";
import InternalChatService from "@/services/internalChat.service";

const InternalChats = () => {
  const pusher = usePusher();
  const { user } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);

  const getChats = async () => {
    const chats = await InternalChatService.getInternalChats();
    setChats(chats);
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    const channel = pusher.subscribe(`user.${user?.id}`);
    channel.bind(`get-chats`, (data: any) => {
      setChats(data);
    });

    return () => {
      channel.unbind(`get-chats`);
    };
  }, [pusher, user?.id]);

  const renderLastMessage = (chat: ChatType) => {
    if (!chat.last_message) {
      return "you have'nt talked say hi";
    } else {
      if (chat.last_message.type === "text") return chat.last_message.content;
      if (chat.last_message.type === "file") return "file";
    }
  };

  return (
    <div className="internal-chats">
      <div className="flex flex-col gap-4">
        <Link to="/internal-chats/new">
          <Button>+ New Chats</Button>
        </Link>
        {chats?.length === 0 && (
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <img src={noRequestsImage} alt="" />
          </div>
        )}
        {chats?.map((chat) => (
          <div className="flex justify-between items-center bg-white p-4 rounded-xl">
            <div className="flex items-center gap-4">
              {!chat.is_read && (
                <span className="w-4 h-4 rounded-full bg-green-400"></span>
              )}
              <img
                className="w-12 h-12 rounded-full"
                src={
                  chat.receiver?.image ||
                  "https://placehold.co/400x400/EEE/31343C"
                }
                alt=""
              />
              <div className="details">
                <div className="flex items-center gap-2">
                  <h4>{chat.receiver?.name}</h4>
                </div>
                <p className="text-slate-500">{renderLastMessage(chat)}</p>
              </div>
            </div>

            <Link to={`/internal-chats/${chat.receiver?.id}`}>
              <Button size="icon">
                <HiEye />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternalChats;
