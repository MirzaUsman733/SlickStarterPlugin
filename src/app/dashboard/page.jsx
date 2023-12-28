"use client"
import React from "react";
import { redirect } from "next/navigation";
import UserDataDashboard from "@/components/UserDataDashboard";
import UserResponseDashboard from "@/components/UserResponseDashboard";
import { useUser } from "@/app/contexts/userData";
const Dashboard = () => {
  const { userWithEmail } = useUser();

  if (!userWithEmail) {
    redirect("/login");
  }

  const userEmail = userWithEmail?.email;
  if (
    userEmail !== undefined &&
    userEmail !== null &&
    userWithEmail?.role === "admin"
  ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div>
          <UserDataDashboard />
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null; // This is necessary to satisfy TypeScript
  }
};

export default Dashboard;













