import useUser from "@/hooks/useUser";
import MessageType from "@/interfaces/message";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import moment from "moment";

const Message = (props: MessageType) => {
  const { user } = useUser();
  const isOwner = useMemo(
    () => props.sender?.id == user?.id,
    [props.sender?.id, user?.id]
  );

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
