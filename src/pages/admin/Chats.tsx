import Pagination from "@/components/Pagination";
import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useI18n from "@/hooks/useI18n";
import Chat from "@/interfaces/chat";
import ChatService from "@/services/chat.service";
import { useMemo, useState } from "react";
import { HiChat } from "react-icons/hi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const ChatRow = (chat: any) => {
  const lastMessage = useMemo(
    () => chat.messages?.data.slice(-1)[0],
    [chat.messages]
  );
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src="https://placehold.co/400x400/EEE/31343C"
          alt=""
        />
        <div className="details">
          <div className="flex items-center gap-2">
            <h4>{chat.receiver?.name}</h4>
            <Badge variant={chat.status === "closed" ? "success" : "warning"}>
              {chat.status}
            </Badge>
          </div>
          {!lastMessage && (
            <p className="text-slate-400">there is not messages</p>
          )}
          {!!lastMessage &&
            (lastMessage.type === "text" ? (
              <p>{lastMessage.content}</p>
            ) : (
              <p>file</p>
            ))}
        </div>
      </div>
      <Link to={`/chat/${chat.id}`}>
        <Button size="icon">
          <HiChat />
        </Button>
      </Link>
    </div>
  );
};

const Chats = () => {
  const { t, language } = useI18n();

  const [chatStatus, setChatStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery(["chats", page], () => ChatService.getAllChats(page));

  console.log(chats?.data);

  const filteredChats = useMemo(() => {
    if (chatStatus === "all") return chats?.data;

    const result =
      chats?.data.filter((chat: Chat) => chat.status.includes(chatStatus)) ||
      [];
    return result;
  }, [chatStatus, chats]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <p>something went wrong</p>;
  }

  if (!chats?.data.length) {
    return <p>chats are empty</p>;
  }

  return (
    <div className="chats">
      <div className="tabs">
        <ToggleGroup
          type="single"
          value={chatStatus}
          onValueChange={setChatStatus}
          dir={language.dir}
        >
          <ToggleGroupItem value="all">{t("agent.chats.all")}</ToggleGroupItem>
          <ToggleGroupItem value="open">
            {t("agent.chats.opened")}
          </ToggleGroupItem>
          <ToggleGroupItem value="close">
            {t("agent.chats.closed")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-2">
        {filteredChats?.map((chat: Chat, idx: number) => (
          <ChatRow {...chat} key={`chat-${idx}`} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={chats?.last_page}
        onPageChange={(page) => setPage(page)}
      ></Pagination>
    </div>
  );
};

export default Chats;
