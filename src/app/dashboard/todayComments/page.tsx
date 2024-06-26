"use client";
import React from "react";
import TodayComments from '@/components/TodayComments';
import { redirect } from "next/navigation";
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
        
        <div>
          <TodayComments />
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null;
  }
};

export default page;
