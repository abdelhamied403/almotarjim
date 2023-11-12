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

const Chats = () => {
  const { t } = useI18n();

  const [chatStatus, setChatStatus] = useState<string>("");

  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery<Chat[]>("chats", ChatService.getAllChats);
  const filteredChats = useMemo(
    () => chats?.filter((chat) => chat.status.includes(chatStatus)) || [],
    [chatStatus, chats]
  );

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <p>something went wrong</p>;
  }

  if (!chats?.length) {
    return <p>chats are empty</p>;
  }

  return (
    <div className="chats">
      <div className="tabs">
        <ToggleGroup
          type="single"
          value={chatStatus}
          onValueChange={setChatStatus}
        >
          <ToggleGroupItem value="">{t("agent.chats.all")}</ToggleGroupItem>
          <ToggleGroupItem value="open">
            {t("agent.chats.opened")}
          </ToggleGroupItem>
          <ToggleGroupItem value="close">
            {t("agent.chats.closed")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-2">
        {filteredChats.map((chat, idx) => (
          <div
            className="flex justify-between items-center bg-white p-4 rounded-xl"
            key={`chat-${idx}`}
          >
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src={chat.receiver?.image}
                alt=""
              />
              <div className="details">
                <div className="flex items-center gap-2">
                  <h4>{chat.owner.name}</h4>
                  <Badge
                    variant={chat.status === "closed" ? "success" : "warning"}
                  >
                    {chat.status}
                  </Badge>
                </div>

                <p>{chat.messages.slice(-1)}</p>
              </div>
            </div>
            <Link to="/chat/1">
              <Button size="icon">
                <HiChat />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
