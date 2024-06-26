"use client"
import React, { useState } from "react";
import { Calendar } from "antd";
import { useUserCommentsContext } from "@/app/contexts/UserCommentsContext";
const CalenderComments: React.FC = () => {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const { userCommentsData } = useUserCommentsContext();

const handleDateSelect = (value: any) => {
  if (value) {
    setSelectedDate(value.toDate());
  }
};
const selectedDateResponses = userCommentsData.filter(
  (response: any) =>
    selectedDate &&
    new Date(response.currentTime).toDateString() ===
      selectedDate.toDateString()
);
const totalTokensUsed = selectedDateResponses.reduce(
    (totalTokens: number, response: any) =>
      totalTokens + (response.totalTokensUsed || 0),
    0
  );
  return (
    <div className="min-h-screen container mx-auto ms-32 max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-xl flex items-center justify-center">
      <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4 text-center">Selected Date Users Data</h1>
        <div style={{ width: "100%" }}>
          <Calendar fullscreen={false} onSelect={handleDateSelect} />
        </div>
        {totalTokensUsed > 1 ? (
          <h2 className="text-xl font-semibold mb-4 text-center">
          Total Tokens Used: {totalTokensUsed}
        </h2>
):""}
       <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
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
                    {response?.email}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Language: </b>
                    {response?.language}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Selected Product: </b>
                    {response?.product}
                  </li>
                   <li className="border-b border-solid border-blue-500 my-2">
                    <b> Prompt: </b>
                    {response?.prompt}
                  </li>
                  <li className="border-b border-solid border-blue-500 my-2">
                    <b> Selected Title: </b>
                    {response?.selectedTitle}
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

export default CalenderComments;
