import Chat from "@/containers/Chat";

const SingleChat = () => {
  const handleSend = (message: string) => {
    console.log(message);
  };
  return <Chat status="open" messages={[]} onSend={handleSend} />;
};

export default SingleChat;
