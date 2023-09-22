import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";
import { HiChat, HiGlobe, HiHome, HiReceiptTax } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useI18n from "@/hooks/useI18n";
import useUser from "@/hooks/useUser";

const SupervisorLayout = () => {
  const { language, changeLocale } = useI18n();
  const { role, user } = useUser();

  return (
    <div className="supervisor-layout h-screen">
      <div className="flex h-full">
        <div className="sidebar min-w-[300px] p-4 flex flex-col justify-between gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="user flex flex-col gap-2 items-center">
              <img src="" alt="src" />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{role}</p>
            </div>
            <div className="flex-1 sidebar-items flex flex-col gap-4">
              <NavLink to="/supervisor" end className="flex items-center gap-2">
                <HiHome />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/supervisor/chat"
                className="flex items-center gap-2"
              >
                <HiChat />
                <span>Chats</span>
              </NavLink>
              <NavLink
                to="/supervisor/request"
                className="flex items-center gap-2"
              >
                <HiReceiptTax />
                <span>Requests</span>
              </NavLink>
            </div>
          </div>
          <Button variant="outlineDanger">Logout</Button>
        </div>
        <div className="page flex-1 flex flex-col gap-4 bg-gray-50 p-4">
          <div className="header">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex justify-end gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="flex gap-2">
                      <span>{language.locale}</span>
                      <HiGlobe />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => changeLocale("ar")}>
                      Arabic
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLocale("en")}>
                      English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorLayout;
