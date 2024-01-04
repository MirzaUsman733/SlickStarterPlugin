"use client"
import React from "react";
import { redirect } from "next/navigation";
import UserCommentsDashboard from "@/components/UserCommentsDashboard";
import { useUser } from "@/app/contexts/userData";

const page = () => {
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
        Dashboard
        <div>
          <UserCommentsDashboard />
        </div>
      </div>
    );
  } else {
  redirect("/frontend");
  return null;
}
};

export default page;


