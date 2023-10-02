import { Outlet } from "react-router-dom";
import { HiChat, HiHome, HiReceiptTax } from "react-icons/hi";
import Sidebar from "@/containers/Sidebar";
import SidebarItem from "@/components/SidebarItem";
import LanguageDropdown from "@/components/LanguageDropdown";

const SupervisorLayout = () => {
  return (
    <div className="supervisor-layout h-screen">
      <div className="flex h-full">
        <Sidebar>
          <SidebarItem to="/dashboard" end>
            <HiHome />
            <span className="hidden lg:block">Dashboard</span>
          </SidebarItem>
          <SidebarItem to="/dashboard/chat">
            <HiChat />
            <span className="hidden lg:block">Chats</span>
          </SidebarItem>
          <SidebarItem to="/dashboard/request">
            <HiReceiptTax />
            <span className="hidden lg:block">Requests</span>
          </SidebarItem>
        </Sidebar>

        <div className="page flex-1 flex flex-col gap-4 bg-gray-50 p-4 overflow-auto">
          <div className="header">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex justify-end gap-4">
                <LanguageDropdown />
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
