"use client"
import React from "react";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatGptPrompt from "@/components/ChatGpt4";
import { useUser } from "@/app/contexts/userData";
const Page: React.FC = async () => {
    const { userWithEmail } = useUser();
  // const session = await getServerSession();
  if (!userWithEmail && userWithEmail?.approved !== true) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto max-w-screen-2xl">
      <h1 className="text-center text-4xl font-bold my-4">
        Welcome to the Slick Starter Article Generator
      </h1>
      <ChatGptPrompt
        userEmail={userWithEmail?.email}
        userName={userWithEmail?.name}
      />
    </div>
  );
};

export default Page;
