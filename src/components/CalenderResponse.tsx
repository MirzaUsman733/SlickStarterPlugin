"use client"
import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import { useUserResponsesContext } from "@/app/contexts/UserResponsesContext";
const CalenderResponse: React.FC = () => {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const { userResponsesData } = useUserResponsesContext();

const handleDateSelect = (value: any) => {
  if (value) {
    setSelectedDate(value.toDate());
  }
};
const selectedDateResponses = userResponsesData.filter(
  (response: any) =>
    selectedDate &&
    new Date(response.currentTime).toDateString() ===
      selectedDate.toDateString()
);
  return (
    <div className="min-h-screen container mx-auto max-w-screen-xl flex items-center justify-center">
      <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4 text-center">Selected Date Users Data</h1>
        <div style={{ width: "100%" }}>
          <Calendar fullscreen={false} onSelect={handleDateSelect} />
        </div>
       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {selectedDateResponses.map((response: any) => (
            <li key={response._id}>
              <div className="bg-white p-4 rounded-lg h-full">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="border-b border-solid border-blue-500 my-2">
                    <b> Name: </b> {response?.name}
                  </h4>
                </div>
                <ul className="">
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Email: </b>
                    {response.email}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Prompt: </b>
                    {response.prompt}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Selected Title: </b>
                    {response.selectedTitle}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Total Tokens Used: </b>
                    {response?.totalTokensUsed}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Date: </b>{" "}
                    {new Date(response.currentTime).toLocaleString()}
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalenderResponse;
