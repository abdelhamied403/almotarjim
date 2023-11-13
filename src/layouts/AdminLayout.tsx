import { Outlet } from "react-router-dom";
import { HiChat, HiHome, HiReceiptTax } from "react-icons/hi";
import Sidebar from "@/containers/Sidebar";
import SidebarItem from "@/components/SidebarItem";
import LanguageDropdown from "@/components/LanguageDropdown";
import { Button } from "@/components/ui/button";
import { RiNotification2Fill } from "react-icons/ri";

const AdminLayout = () => {
  return (
    <div className="admin-layout h-screen">
      <div className="flex h-full">
        <Sidebar>
          <SidebarItem to="/dashboard" end>
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
          <SidebarItem to="/agents">
            <HiReceiptTax />
            <span className="hidden lg:block">Agents</span>
          </SidebarItem>
          <SidebarItem to="/translators">
            <HiReceiptTax />
            <span className="hidden lg:block">Translators</span>
          </SidebarItem>
          <SidebarItem to="/supervisors">
            <HiReceiptTax />
            <span className="hidden lg:block">Supervisors</span>
          </SidebarItem>
          <SidebarItem to="/users">
            <HiReceiptTax />
            <span className="hidden lg:block">Users</span>
          </SidebarItem>
          <SidebarItem to="/reports">
            <HiReceiptTax />
            <span className="hidden lg:block">Reports</span>
          </SidebarItem>
          <SidebarItem to="/statistics">
            <HiReceiptTax />
            <span className="hidden lg:block">Statistics</span>
          </SidebarItem>
        </Sidebar>

        <main className="page flex-1 flex flex-col gap-4 bg-gray-50 p-4 lg:h-full overflow-auto">
          <div className="flex-1 flex flex-col gap-4 h-full">
            <div className="header bg-white p-4 rounded-xl">
              <div className="flex justify-end gap-4">
                <Button>
                  <RiNotification2Fill />
                </Button>
                <LanguageDropdown />
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
