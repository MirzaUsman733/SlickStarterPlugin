import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GptComments from "@/components/GptComments";
const Page: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container-lg mx-auto">
      <h1 className="text-center text-4xl font-bold my-4">
        Welcome to the Slick Starter Comments Generator
      </h1>
      <GptComments
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />
    </div>
  );
};

export default Page;
