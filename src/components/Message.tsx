import MessageType from "@/interfaces/message";
import { cn } from "@/lib/utils";

export type MessageProps = MessageType & {};

const Message = (props: MessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 items-end",
        props.provider === true ? "" : "flex-row-reverse"
      )}
    >
      <img src={props.img} alt="almotarjim" className="w-5 h-5 rounded-full" />
      <p
        className={cn(
          "flex gap-3 items-center rounded-xl p-4",
          props.provider === true
            ? "bg-primary-100 text-primary-600"
            : "bg-primary-600 text-primary-100"
        )}
      >
        {props.message}
      </p>
    </div>
  );
};

export default Message;
