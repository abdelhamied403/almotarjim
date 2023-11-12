import User from "./user";

type Message = {
  id: string;
  content: string;
  sender: User;
  type: "text" | "file" | "voice";
  created_at: string;
  updated_at: string;
};

export default Message;
