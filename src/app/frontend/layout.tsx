import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { UserResponsesContextProvider } from "../contexts/UserResponsesContext";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return <>
    {/* <Navbar /> */}
  <Header />
    <UserResponsesContextProvider>
     
      {children}
    </UserResponsesContextProvider>
    </>;
};

export default Layout;
