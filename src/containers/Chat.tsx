import Message from "@/components/Message";
import Spinner from "@/components/ui/Spinner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useMic from "@/hooks/useMic";
import useUser from "@/hooks/useUser";
import ChatType from "@/interfaces/chat";
import { t } from "i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiLogout, HiMicrophone, HiPaperClip, HiTrash } from "react-icons/hi";
import { HiPause } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";

type ChatProps = Partial<ChatType> & {
  onSend: (message: { type: string; content: any }) => Promise<any>;
};
const Chat = ({
  status = "closed",
  messages = [],
  onSend,
  receiver,
  owner,
}: ChatProps) => {
  const [message, setMessage] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const { role } = useUser();
  const messagesContainer = useRef<HTMLDivElement>(null);
  const {
    status: recordingStatus,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    audioBlob,
  } = useMic();
  const { toast } = useToast();

  const inputFile = useRef<HTMLInputElement>(null);

  const handleEnterToSendMessage = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    console.log(message);
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

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current?.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-primary-100 rounded-xl">
        {!receiver && (
          <div className="flex gap-3 items-center">
            <h3>you are still in queue...</h3>
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
      <div
        className="flex-1 h-full flex flex-col gap-4 p-8 bg-white rounded-2xl overflow-y-auto space-y-8"
        ref={messagesContainer}
      >
        {messages.map((msg) => (
          <Message {...msg} />
        ))}
      </div>
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
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={resumeRecording}
              >
                <HiMicrophone />
              </Button>
            )}

            {recordingStatus === "recording" && (
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={pauseRecording}
              >
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
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleMicClick}
              >
                <HiMicrophone />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleFileClick}
              >
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
    </>
  );
};

export default Chat;
