"use client"
import React from "react";
import { redirect } from "next/navigation";
import SpecificUserData from "@/components/SpecificUserData";
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
      <div className="flex min-h-screen flex-col items-center justify-between max-w-screen-2xl">
        <div>
          <SpecificUserData/>
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null; 
  }
};

export default page;













