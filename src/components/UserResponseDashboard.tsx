"use client";
import React, { useEffect, useState } from "react";

interface UserResponses {
  _id: string;
  name: string;
  email: string;
  prompt: string;
  selectedTitle: string;
  totalTokensUsed: number;
}

const UserResponseDashboard: React.FC = () => {
  const [userResponsesData, setUserResponsesData] = useState<UserResponses[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/showResponseData", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { userResponseData: UserResponses[] } = await response.json();
        setUserResponsesData(data.userResponseData);
        console.log(data.userResponseData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen container mx-auto max-w-screen-xl flex items-center justify-center">
      <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4 text-center">All Users Data</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userResponsesData?.map((response) => (
            <li key={response._id}>
              <div className="bg-white p-4 rounded-lg h-full">
                <div className="flex justify-between items-center mb-2">
                  <h4>{response?.name}</h4>
                </div>
                <ul className="">
                  <li>{response.email}</li>
                  <li>{response.prompt}</li>
                  <li>{response.selectedTitle}</li>
                  <li>{response?.totalTokensUsed}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserResponseDashboard;
