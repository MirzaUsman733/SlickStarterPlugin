import React from "react";
import TodayResponses from "@/components/TodayResponses";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      Dashboard
      <div>
        <TodayResponses />
      </div>
    </div>
  );
};

export default page;
