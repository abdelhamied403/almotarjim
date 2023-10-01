import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { HiChat, HiGlobe, HiHome, HiReceiptTax } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useI18n from "@/hooks/useI18n";
import Sidebar from "@/containers/Sidebar";
import SidebarItem from "@/components/SidebarItem";

const UserLayout = () => {
  const { language, changeLocale } = useI18n();

  return (
    <div className="user-layout h-screen">
      <div className="flex h-full">
        <Sidebar>
          <SidebarItem to="/" end>
            <HiHome />
            <span className="hidden lg:block">Dashboard</span>
          </SidebarItem>
          <SidebarItem to="/chat">
            <HiChat />
            <span className="hidden lg:block">Chats</span>
          </SidebarItem>
          <SidebarItem to="/request">
            <HiReceiptTax />
            <span className="hidden lg:block">Requests</span>
          </SidebarItem>
        </Sidebar>

        <div className="page flex-1 flex flex-col gap-4 bg-gray-50 p-4 overflow-auto">
          <div className="header">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex justify-end gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
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

export default UserLayout;
