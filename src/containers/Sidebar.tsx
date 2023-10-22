import useUser from "@/hooks/useUser";
import { Button } from "../components/ui/button";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export type SidebarProps = {
  children: JSX.Element | JSX.Element[];
};
const Sidebar = ({ children }: SidebarProps) => {
  const { role, user } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar lg:w-[300px] p-4 flex flex-col justify-between gap-4 sticky top-0 h-screen">
      <div className="flex-1 flex flex-col gap-4">
        <div className="user flex flex-col gap-2 items-center">
          <img src={user?.image} alt="src" />
          <span className="details hidden lg:flex flex-col gap-1 items-center text-center">
            <p className="text-sm">{role}</p>
            <h3>{user?.name}</h3>
            <a
              className="text-sm text-primary-600"
              href={`mailto:${user?.email}`}
            >
              {user?.email}
            </a>
          </span>
        </div>
        <div className="flex-1 sidebar-items flex flex-col gap-4">
          {children}
        </div>
      </div>
      <Button variant="outlineDanger" onClick={handleLogout}>
        <HiLogout />
        <span className="hidden lg:block">Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;
