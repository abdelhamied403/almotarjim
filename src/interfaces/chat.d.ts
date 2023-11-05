import User from "./user";

type Chat = {
  messages: string[];
  id: number;
  owner: User;
  receiver: User;
  request_id: number;
  status: "open" | "closed";
};

export default Chat;
