import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatGptPrompt from "@/components/ChatGpt4";
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
      <ChatGptPrompt
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />
      {/* <Checking/> */}
    </div>
  );
};

export default Page;
