"use client"
import React from "react";
import { redirect } from "next/navigation";
import SpecificUserComments from "@/components/SpecificUserComments";
import { useUser } from "@/app/contexts/userData";
import { useUserResponsesContext } from "@/app/contexts/UserResponsesContext";
import { useUserDataContext } from "@/app/contexts/UserDataContext";
const page = () => {
  const { userWithEmail } = useUser();
  const { userResponsesData } = useUserResponsesContext();
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
          <SpecificUserComments/>
        </div>
      </div>
    );
  } else {
    redirect("/frontend");
    return null; 
  }
};

export default page;













