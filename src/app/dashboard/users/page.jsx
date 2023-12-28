import React from "react";
import UserDataDashboard from "@/components/UserDataDashboard";
import UserResponseDashboard from "@/components/UserResponseDashboard";

const page = () => {
//   const session = await getServerSession();

//   if (!session) {
//     redirect("/");
//   }

//   const userEmail = session?.user?.email;
//   const allowedEmails = [
//     "muhammadusman@gmail.com",
//     "arbaz@gmail.com",
//     "awais@gmail.com",
//   ];

//   if (
//     userEmail !== undefined &&
//     userEmail !== null &&
//     allowedEmails.includes(userEmail)
//   ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
        Dashboard
        <div>
          {/* <UserDataDashboard /> */}
          <UserResponseDashboard />
        </div>
      </div>
    );
//   } else {
//     redirect("/frontend");
//     return null; // This is necessary to satisfy TypeScript
//   }
};

export default page;


