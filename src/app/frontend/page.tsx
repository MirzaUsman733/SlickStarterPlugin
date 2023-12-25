import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatGptPrompt from "@/components/ChatGpt4";

const page: React.FC = async () => {
      const session = await getServerSession();
      if (!session) {
        redirect("/");
      }
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>Frontend Home</div>
      <ChatGptPrompt/>
    </div>
  );
};

export default page;
