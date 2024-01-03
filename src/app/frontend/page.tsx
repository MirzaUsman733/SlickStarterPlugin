import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatGptPrompt from "@/components/ChatGpt4";
import GptComments from "@/components/GptComments";
const Page: React.FC = async () => {
  
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto">
      <h1 className="text-center text-4xl font-bold">Welcome to the Home Page</h1>
      <ChatGptPrompt
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />
      <GptComments
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />
    </div>
  );
};

export default Page;
