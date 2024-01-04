"use client";
import React from "react";
import CalenderComments from '@/components/CalenderComments';
import { useUser } from "@/app/contexts/userData";
import { redirect } from "next/navigation";
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
          <CalenderComments />
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null;
  }
};

export default page;
