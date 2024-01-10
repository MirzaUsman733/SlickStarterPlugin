import React, { ReactNode } from "react";
import { UserResponsesContextProvider } from "../contexts/UserResponsesContext";
import Header from "@/components/Header";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return <>
    {/* <Navbar /> */}
  <Header />
    <UserResponsesContextProvider>
     <div>
      {children}
      </div>
    </UserResponsesContextProvider>
    </>;
};

export default Layout;
