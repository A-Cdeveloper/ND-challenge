import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">

      <Outlet />
     
    </div>
  );
};

export default AppLayout;
