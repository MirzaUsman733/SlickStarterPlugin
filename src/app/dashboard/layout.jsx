import React from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { UserDataProvider } from "../contexts/UserDataContext";
import { UserResponsesContextProvider } from "../contexts/UserResponsesContext";
export default function Layout({ children }) {
  return (
    <>
      <DashboardLayout />
      <UserResponsesContextProvider>
        <UserDataProvider >
        {children}
        </UserDataProvider>
        </UserResponsesContextProvider>
    </>
  )
}