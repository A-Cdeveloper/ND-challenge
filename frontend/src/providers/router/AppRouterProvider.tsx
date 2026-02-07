import { router } from "./router";
import { RouterProvider } from "react-router";

const AppRouterProvider = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default AppRouterProvider;
