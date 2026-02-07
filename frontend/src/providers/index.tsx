import AppRouterProvider from "./router/AppRouterProvider";
import TanstackProvider from "./tanstackquery/TanstackProvider";
import { AuthProvider } from "@/context/AuthContext";

const AppProviders = () => {
  return (
    <TanstackProvider>
      <AuthProvider>
        <AppRouterProvider />
      </AuthProvider>
    </TanstackProvider>
  );
};

export default AppProviders;
