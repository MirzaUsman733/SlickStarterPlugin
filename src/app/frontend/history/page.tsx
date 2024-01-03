import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserPersonalData from "@/components/UserPersonalData";
// import Checking from "@/components/Checking";
const Page: React.FC = async () => {
  
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto">
      <h1 className="text-center">Welcome to the Home Page</h1>
      <UserPersonalData/>
    </div>
  );
};

export default Page;
