import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout h-screen">
      <div className="flex h-full">
        <div className="sidebar min-w-[300px]">sidebar</div>
        <div className="page flex-1 flex flex-col gap-4 bg-gray-100 p-4">
          <div className="header">
            <div className="bg-white p-4 rounded-xl">header</div>
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
