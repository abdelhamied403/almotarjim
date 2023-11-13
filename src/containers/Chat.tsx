import ChatType from "@/interfaces/chat";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useUser from "@/hooks/useUser";
import useMic from "@/hooks/useMic";
import { useToast } from "@/components/ui/use-toast";
import { Link, useParams } from "react-router-dom";
import useI18n from "@/hooks/useI18n";

import ChatService from "@/services/chat.service";
import { Button } from "@/components/ui/button";
import {
  HiEye,
  HiLogout,
  HiMicrophone,
  HiPaperClip,
  HiPause,
  HiTrash,
} from "react-icons/hi";
import Spinner from "@/components/ui/Spinner";
import { IoSend } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import Message from "@/components/Message";

type ChatProps = Partial<ChatType> & {
  onSend?: (message: { type: string; content: any }) => Promise<any>;
  children: JSX.Element | JSX.Element[];
};

const ChatProvider = createContext<any>({});
const Chat = ({ owner, receiver, status, children, onSend }: ChatProps) => {
  return (
    <ChatProvider.Provider value={{ onSend, owner, receiver, status }}>
      {children}
    </ChatProvider.Provider>
  );
};

export type ChatHeaderProps = {
  children?: JSX.Element | JSX.Element[];
};
const ChatHeader = ({ children }: ChatHeaderProps) => {
  if (children) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-primary-100 rounded-xl">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-primary-100 rounded-xl">
      <ChatHeaderTitle />
      <ChatHeaderActions />
    </div>
  );
};

export type ChatHeaderTitleProps = {
  children?: JSX.Element | JSX.Element[];
};
const ChatHeaderTitle = ({ children }: ChatHeaderTitleProps) => {
  const { receiver } = useContext(ChatProvider);
  const { t } = useI18n();

  if (children) return children;

  return (
    <>
      {!receiver && (
        <div className="flex gap-3 items-center">
          <h3>{t("chat.youAreStillInQueue")}</h3>
        </div>
      )}
      {receiver && (
        <div className="flex gap-3 items-center">
          <img
            src={receiver?.image}
            alt="almotarjim"
            className="w-14 h-14 rounded-full"
          />
          <h3>{receiver?.name}</h3>
        </div>
      )}
    </>
  );
};
export type ChatHeaderActionsProps = {
  children?: JSX.Element | JSX.Element[];
};
const ChatHeaderActions = ({ children }: ChatHeaderActionsProps) => {
  const { status } = useContext(ChatProvider);
  const { role } = useUser();
  const { t } = useI18n();
  const { toast } = useToast();
  const { id = "" } = useParams();

  const handleEndChat = async () => {
    try {
      await ChatService.closeChat(id);
      toast({
        title: t("shared.error"),
        description: "chat closed successfully",
      });
    } catch (error) {
      toast({
        title: t("shared.error"),
        description: "can't close this chat",
        variant: "destructive",
      });
    }
  };

  if (children) return children;
  return (
    <div className="flex gap-3">
      <Link to={`/chat/${id}`}>
        <Button size="icon">
          <HiEye></HiEye>
        </Button>
      </Link>
      <Link to="/request/create">
        <Button className="">{t("chat.create")}</Button>
      </Link>
      {status === "open" && role !== "client" && (
        <Button
          variant={"danger"}
          className="flex gap-2 items-center"
          onClick={handleEndChat}
        >
          {t("chat.endChat")} <HiLogout />
        </Button>
      )}
    </div>
  );
};

export type ChatBodyProps = {
  children?: JSX.Element | JSX.Element[];
};
const ChatBody = ({ children }: ChatBodyProps) => {
  const { messages } = useContext(ChatProvider);

  const messagesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current?.scrollHeight;
    }
  }, [messages]);

  if (children)
    return (
      <div
        className="flex-1 h-full flex flex-col gap-4 p-8 bg-white rounded-2xl overflow-y-auto space-y-8"
        ref={messagesContainer}
      >
        {children}
      </div>
    );

  return (
    <div
      className="flex-1 h-full flex flex-col gap-4 p-8 bg-white rounded-2xl overflow-y-auto space-y-8"
      ref={messagesContainer}
    >
      {messages.map((msg: any) => (
        <Message {...msg} />
      ))}
    </div>
  );
};

export type ChatFooterProps = {
  children?: JSX.Element | JSX.Element[];
};
const ChatFooter = ({ children }: ChatFooterProps) => {
  const { owner, onSend } = useContext(ChatProvider);

  const {
    status: recordingStatus,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    audioBlob,
  } = useMic();

  const [message, setMessage] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const { toast } = useToast();

  const { t } = useI18n();
  const inputFile = useRef<HTMLInputElement>(null);

  const handleEnterToSendMessage = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    setSendMessageLoading(true);
    try {
      await onSend({
        type: "text",
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setSendMessageLoading(false);
    }
  };
  const handleSendVoiceMessage = useCallback(async () => {
    pauseRecording();
    setSendMessageLoading(true);
    try {
      await onSend({
        type: "voice",
        content: audioBlob,
      });
      resetRecording();
    } catch (error) {
      console.log(error);
    } finally {
      setSendMessageLoading(false);
    }
  }, [audioBlob, onSend, pauseRecording, resetRecording]);

  const handleMicClick = () => {
    if (recordingStatus === "recording") {
      stopRecording();
    }
    if (recordingStatus === "idle") {
      startRecording();
    }
  };
  const handleFileClick = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };
  const handleFileSend = async (e: any) => {
    const fileSize = e.target.files[0].size / 1000;

    if (fileSize > 2000) {
      toast({
        title: t("shared.error"),
        description: "file is large",
        variant: "destructive",
      });
      return;
    }

    await onSend({
      type: "file",
      content: e.target.files[0],
    });
  };

  if (children)
    return (
      <div className="flex items-center p-6 bg-primary-100 rounded-xl gap-3">
        {children}
      </div>
    );

  return (
    <div className="flex items-center p-6 bg-primary-100 rounded-xl gap-3">
      <img
        src={owner?.image}
        alt="almotarjim"
        className="w-14 h-14 rounded-full"
      />

      {/* recording state */}
      {recordingStatus !== "idle" && (
        <div className="flex-1 flex justify-end items-center gap-4">
          <Button variant={"outline"} size={"icon"} onClick={resetRecording}>
            <HiTrash />
          </Button>
          {audioBlob && (
            <audio controls>
              <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
            </audio>
          )}

          {recordingStatus === "paused" && (
            <Button variant={"outline"} size={"icon"} onClick={resumeRecording}>
              <HiMicrophone />
            </Button>
          )}

          {recordingStatus === "recording" && (
            <Button variant={"outline"} size={"icon"} onClick={pauseRecording}>
              <HiPause />
            </Button>
          )}

          <Button
            className="flex"
            size={"icon"}
            onClick={handleSendVoiceMessage}
            disabled={recordingStatus === "recording"}
          >
            {sendMessageLoading ? <Spinner /> : <IoSend />}
          </Button>
        </div>
      )}
      {recordingStatus === "idle" && (
        <>
          <Input
            placeholder={t("chat.typeMessage")}
            className=""
            value={message}
            onKeyDown={handleEnterToSendMessage}
            onChange={(e) => setMessage(e.target.value)}
          ></Input>
          <div className="flex gap-3 justify-end items-end ">
            <Button variant={"outline"} size={"icon"} onClick={handleMicClick}>
              <HiMicrophone />
            </Button>
            <Button variant={"outline"} size={"icon"} onClick={handleFileClick}>
              <HiPaperClip />
            </Button>
            <input
              type="file"
              id="file"
              ref={inputFile}
              className="hidden"
              onChange={handleFileSend}
            />

            {!!message && (
              <Button size={"icon"} onClick={handleSendMessage}>
                {sendMessageLoading ? <Spinner /> : <IoSend />}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ChatHeader.Actions = ChatHeaderActions;
ChatHeader.Title = ChatHeaderTitle;
Chat.Header = ChatHeader;
Chat.Body = ChatBody;
Chat.Message = Message;
Chat.Footer = ChatFooter;

export default Chat;
