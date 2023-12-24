import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserDataDashboard from "@/components/UserDataDashboard";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  const userEmail = session?.user?.email;
  const allowedEmails = [
    "usman@gmail.com",
    "arbaz@gmail.com",
    "awais@gmail.com",
  ];

   if (
     userEmail !== undefined &&
     userEmail !== null &&
     allowedEmails.includes(userEmail)
   ) {
     return (
       <div className="flex min-h-screen flex-col items-center justify-between">
         Dashboard
         <div>
           <UserDataDashboard />
         </div>
       </div>
     );
   } else {
     redirect("/frontend");
     return null; // This is necessary to satisfy TypeScript
   }
};

export default Dashboard;
