import Message from "@/components/Message";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/useUser";
import MessageType from "@/interfaces/message";
import { t } from "i18next";
import { useState } from "react";
import { HiLogout, HiMicrophone, HiPaperClip } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";

type ChatProps = {
  messages: MessageType[];
  status: "open" | "closed";
  onSend: (message: string) => void;
};
const Chat = ({ status, messages = [], onSend }: ChatProps) => {
  const [message, setMessage] = useState("");
  const { role } = useUser();
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-primary-100 rounded-xl">
        <div className="flex gap-3 items-center">
          <img
            src="https://placehold.co/400x400/fee/31343C"
            alt="almotarjim"
            className="w-14 h-14 rounded-full"
          />
          <h3>{t("chat.name")}</h3>
        </div>
        {status === "open" && role !== "client" && (
          <div className="flex gap-3">
            <Link to="/request/create">
              <Button className="">{t("chat.create")}</Button>
            </Link>
            <Button variant={"danger"} className="flex gap-2 items-center">
              {t("chat.endChat")} <HiLogout />
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 h-full flex flex-col gap-4 p-8 bg-white rounded-2xl overflow-y-auto space-y-8">
        {messages.map((msg) => (
          <Message {...msg} />
        ))}
      </div>
      <div className="flex items-center p-6 bg-primary-100 rounded-xl gap-3">
        <div className="flex gap-3 items-center flex-1">
          <img
            src="https://placehold.co/400x400/fee/31343C"
            alt="almotarjim"
            className="w-14 h-14 rounded-full"
          />
          <Input
            placeholder={t("chat.typeMessage")}
            className=""
            onChange={(e) => setMessage(e.target.value)}
          ></Input>
        </div>
        <div className="flex gap-3 justify-end items-end ">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => onSend(message)}
          >
            <HiMicrophone />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <HiPaperClip />
          </Button>
          <Button size={"icon"}>
            <IoSend />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
