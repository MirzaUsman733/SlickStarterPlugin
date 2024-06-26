import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserPersonalData from "@/components/UserPersonalData";
const Page: React.FC = async () => {
  
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto">
      <h1 className="text-center text-4xl font-bold my-4">
        Welcome to the Slick Starter User Personal Data
      </h1>
      <UserPersonalData />
    </div>
  );
};

export default Page;
