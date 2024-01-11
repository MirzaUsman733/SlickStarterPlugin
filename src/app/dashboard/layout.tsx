import React, { ReactNode } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { UserDataProvider } from "../contexts/UserDataContext";
import { UserResponsesContextProvider } from "../contexts/UserResponsesContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <DashboardLayout />
      <UserResponsesContextProvider>
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </UserResponsesContextProvider>
    </>
  );
};

export default Layout;
