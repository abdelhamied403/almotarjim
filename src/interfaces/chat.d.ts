import Request from "./request";
import User from "./user";

type Chat = {
  messages: string[];
  id: 8;
  owner_id: User;
  receiver_id: User;
  request_id: Request;
  status: "open" | "closed";
};

export default Chat;
