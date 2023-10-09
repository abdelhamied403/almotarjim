import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { HiChat } from "react-icons/hi";
import { Link } from "react-router-dom";

const chats = new Array(30).fill(0).map(() => ({
  status: Math.random() > 0.5 ? "closed" : "opened",
}));

const Chats = () => {
  const [chatsFilter, setChatsFilter] = useState<string>("d");
  return (
    <div className="chats">
      <div className="tabs">
        <ToggleGroup
          type="single"
          value={chatsFilter}
          onValueChange={setChatsFilter}
        >
          <ToggleGroupItem value="d">All</ToggleGroupItem>
          <ToggleGroupItem value="opened">Opened</ToggleGroupItem>
          <ToggleGroupItem value="closed">Closed</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-2">
        {chats
          .filter((chat) => chat.status.includes(chatsFilter))
          .map((chat, idx) => (
            <div
              className="flex justify-between items-center bg-white p-4 rounded-xl"
              key={`chat-${idx}`}
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://placehold.co/400x400/EEE/31343C"
                  alt=""
                />
                <div className="details">
                  <div className="flex items-center gap-2">
                    <h4>from</h4>
                    <Badge
                      variant={chat.status === "closed" ? "success" : "warning"}
                    >
                      {chat.status}
                    </Badge>
                  </div>

                  <p>last message</p>
                </div>
              </div>
              <Link to="/dashboard/chat/1">
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
