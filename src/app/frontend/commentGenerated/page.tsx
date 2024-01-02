import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GptComments from "@/components/GptComments";
// import Checking from "@/components/Checking";
const Page: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto">
      <h1>Welcome to the Home Page</h1>
      <div>Frontend Home</div>
      <GptComments />
    </div>
  );
};

export default Page;
