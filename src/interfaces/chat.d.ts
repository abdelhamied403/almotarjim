import Message from "./message";
import User from "./user";

type Chat = {
  messages: Message[];
  id: string;
  owner: User;
  receiver: User;
  request_id: number;
  status: "open" | "closed";
  last_message?: Message;
  is_read?: boolean;
};

export default Chat;
