import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { HiGlobe } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useI18n from "@/hooks/useI18n";

const MainLayout = () => {
  const { language, changeLocale } = useI18n();
  return (
    <div className="main-layout h-screen">
      <div className="flex h-full">
        <div className="sidebar min-w-[300px]">sidebar</div>
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

export default MainLayout;
