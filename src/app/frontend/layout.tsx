import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { UserResponsesContextProvider } from "../contexts/UserResponsesContext";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return <><Navbar />
    <UserResponsesContextProvider>
      {children}
    </UserResponsesContextProvider>
    </>;
};

export default Layout;
