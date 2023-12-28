import React from "react";
import CalenderResponse from "@/components/CalenderResponse";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      Dashboard
      <div>
        <CalenderResponse />
      </div>
    </div>
  );
};

export default page;