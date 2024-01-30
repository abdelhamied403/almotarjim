// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import User from "@/interfaces/user";
import AdminService from "@/services/admin.service";
import { useEffect, useState } from "react";
import { HiChat } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const CreateInternalChat = () => {
  const [internalUsers, setInternalUsers] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await AdminService.getInternalUsers();
    setInternalUsers(data.data);
  };

  const handleInternalChat = async (id: string) => {
    const res = await AdminService.createInternalUserChat(id);
    navigate(`/internal-chats/${res.data.receiver.id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Link to="/internal-chats">
        <Button>Back</Button>
      </Link>
      {internalUsers.map((internalUser: User) => (
        <div className="flex justify-between items-center bg-white p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src="https://placehold.co/400x400/EEE/31343C"
              alt=""
            />
            <div className="details">
              <div className="flex items-center gap-2">
                <h4>{internalUser.name}</h4>
                {/* <Badge variant={chat.status === "closed" ? "success" : "warning"}>
              {chat.status}
            </Badge> */}
              </div>
              {/* {!lastMessage && (
            <p className="text-slate-400">there is not messages</p>
          )}
          {!!lastMessage &&
            (lastMessage.type === "text" ? (
              <p>{lastMessage.content}</p>
            ) : (
              <p>file</p>
            ))} */}
            </div>
          </div>

          <Button
            size="icon"
            onClick={() => handleInternalChat(internalUser.id)}
          >
            <HiChat />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CreateInternalChat;
