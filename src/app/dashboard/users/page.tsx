"use client"
import React from "react";
import { redirect } from "next/navigation";
import UserResponseDashboard from "@/components/UserResponseDashboard";
import { useUser } from "@/app/contexts/userData";

const Page: React.FC = () => {
  const { userWithEmail } = useUser();

  if (!userWithEmail) {
    redirect("/login");
    return null;
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
          <UserResponseDashboard />
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null;
  }
};

export default Page;
