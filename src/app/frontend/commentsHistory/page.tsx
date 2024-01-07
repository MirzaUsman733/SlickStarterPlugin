import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserPersonalComments from "@/components/UserPersonalComments";
const Page: React.FC = async () => {
  
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto">
      <h1 className="text-center text-4xl font-bold my-4">
        User Comments Data
      </h1>
      <UserPersonalComments />
    </div>
  );
};

export default Page;
