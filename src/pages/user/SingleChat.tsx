import Chat from "@/containers/Chat";
import ChatService from "@/services/chat.service";

const SingleChat = () => {
  const handleSend = (message: string) => {
    ChatService.sendMessage(message);
    console.log(message);
  };
  return <Chat status="open" messages={[]} onSend={handleSend} />;
};

export default SingleChat;
