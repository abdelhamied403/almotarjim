import useUser from "@/hooks/useUser";
import MessageType from "@/interfaces/message";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import moment from "moment";
import { imageFileExtensions } from "../constants/imageFileExtensions";
import { Button } from "./ui/button";
import { HiDownload } from "react-icons/hi";
import { downloadURI } from "@/lib/file";

const Message = (props: MessageType) => {
  const { user } = useUser();
  const isOwner = useMemo(
    () => props.sender?.id == user?.id,
    [props.sender?.id, user?.id]
  );

  const downloadFile = () => {
    downloadURI(
      `https://api.almotarjim.net/api/file/message/${props.id}`,
      `file-${new Date().getTime()}`
    );
  };

  if (props.type === "voice") {
    return (
      <div className="voice-message">
        <div
          className={cn(
            "flex gap-3 items-end",
            isOwner ? "flex-row-reverse" : ""
          )}
        >
          <img
            src={props.sender?.image}
            alt="almotarjim"
            className="w-5 h-5 rounded-full mb-6"
          />
          <div>
            <div
              className={cn(
                "flex gap-3 items-center rounded-xl p-4 break-all",
                isOwner
                  ? "bg-primary-600 text-primary-100"
                  : "bg-primary-100 text-primary-600"
              )}
            >
              <audio controls>
                <source src={props.content} type="audio/webm" />
              </audio>
            </div>
            <p className="text-slate-500 text-sm">
              {moment(props.created_at).fromNow(true)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (props.type === "file") {
    const fileExt =
      props.content.split(".")[props.content.split(".").length - 1];
    const isImage = imageFileExtensions.includes(fileExt);

    return (
      <div className="file-message">
        <div
          className={cn(
            "flex gap-3 items-end",
            isOwner ? "flex-row-reverse" : ""
          )}
        >
          <div
            className={cn(
              "max-w-lg flex gap-3 items-end",
              isOwner ? "flex-row-reverse" : ""
            )}
          >
            <img
              src={props.sender?.image}
              alt="almotarjim"
              className="w-5 h-5 rounded-full mb-6"
            />
            <div>
              <div
                className={cn(
                  "flex gap-3 items-center rounded-xl p-4 break-all",
                  isOwner
                    ? "bg-primary-600 text-primary-100"
                    : "bg-primary-100 text-primary-600"
                )}
              >
                {isImage && <img src={props.content}></img>}
                {!isImage && (
                  <div className="flex items-center gap-4">
                    <p>
                      File-{props.id}.{fileExt}
                    </p>
                    <Button size="icon" variant="subtle" onClick={downloadFile}>
                      <HiDownload></HiDownload>
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-slate-500 text-sm">
                {moment(props.created_at).fromNow(true)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message">
      <div
        className={cn(
          "flex gap-3 items-end",
          isOwner ? "flex-row-reverse" : ""
        )}
      >
        <img
          src={props.sender?.image}
          alt="almotarjim"
          className="w-5 h-5 rounded-full mb-6"
        />
        <div className="">
          <p
            className={cn(
              "flex gap-3 items-center rounded-xl p-4 break-all",
              isOwner
                ? "bg-primary-600 text-primary-100"
                : "bg-primary-100 text-primary-600"
            )}
          >
            {props.content}
          </p>
          <p className="text-slate-500 text-sm">
            {moment(props.created_at).fromNow(true)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
