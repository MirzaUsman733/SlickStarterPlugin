// import React from "react";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// const Dashboard = async () => {
//   const session = await getServerSession();
//   if (!session) {
//     redirect("/");
//   }
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-between p-24">
//       Dashboard
//     </div>
//   );
// };

// export default Dashboard;



import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  console.log("session: ", session);
  // Check if session exists and if the email is one of the specified emails
  // if (!session || !["mirzausman@gmail.com", "arbaz@gmail.com", "awais@gmail.com"].includes(session.user.email)) {
  //   redirect("/");
  // }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard
    </div>
  );
};

export default Dashboard;
