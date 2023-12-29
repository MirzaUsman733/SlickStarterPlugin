"use client";
import React, { useEffect, useState } from "react";
import { useUserResponsesContext } from "@/app/contexts/UserResponsesContext";
import { useUserDataContext } from "@/app/contexts/UserDataContext";
const SpecificUserData: React.FC = () => {
 const { userResponsesData } = useUserResponsesContext();
 const { userData, loading } = useUserDataContext();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
   const [selectedResponseData, setSelectedResponseData] = useState<any[] | null>(null);
  console.log("Start User Response:", userResponsesData);
  console.log("Start User Data:", userData);
  console.log("Start User selected:", selectedUserId);
  
useEffect(() => {
  if (selectedUserId) {
    const matchingResponses = userResponsesData.filter(
      (response: any) => response._id === selectedUserId
    );
    console.log("Matching Response",matchingResponses)
    setSelectedResponseData(
      matchingResponses.length > 0 ? matchingResponses : null
    );
  } else {
    setSelectedResponseData(null);
  }
}, [selectedUserId, userResponsesData]);

const handleUserSelect = (userId: string) => {
  setSelectedUserId(userId);
  console.log(userId);
};


  return (
    <div>
      <div>
        <div className="shadow-2xl shadow-slate-700 text-black p-8 bg-opacity-20 bg-zince-300/10 flex flex-col gap-2 my-6">
          <h1 className="text-2xl font-bold mb-4">All Users</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any) => (
                <tr key={user._id} onClick={() => handleUserSelect(user._id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.role}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="min-h-screen container mx-auto max-w-screen-xl flex items-center justify-center">
          <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-4 text-center">
              User Responses Data
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedResponseData ?.map((response: any) => (
                <li key={response._id}>
                  <div className="bg-white p-4 rounded-lg h-full">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="border-b border-solid border-blue-500 my-2">
                        <b> Name: </b> {response?.name}
                      </h4>
                    </div>
                    <ul>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Email: </b>
                        {response.email}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Prompt: </b>
                        {response.prompt}
                      </li>
                      {/* Add other response fields here */}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificUserData;
