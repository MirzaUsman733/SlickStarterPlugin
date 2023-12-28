import React from "react";
import UserDataDashboard from "@/components/UserDataDashboard";
import UserResponseDashboard from "@/components/UserResponseDashboard";

const page = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between">
        Dashboard
        <div>
          {/* <UserDataDashboard /> */}
          <UserResponseDashboard />
        </div>
      </div>
    );
};

export default page;


