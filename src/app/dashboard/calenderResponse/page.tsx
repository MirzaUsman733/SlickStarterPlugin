"use client";
import React from "react";
import CalenderResponse from "@/components/CalenderResponse";
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
        
        <div>
          <CalenderResponse />
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null;
  }
};

export default page;
