"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserResponses {
  _id: string;
  name: string;
  email: string;
  prompt: string;
  selectedTitle: string;
  totalTokensUsed: number;
  currentTime: Date;
}

const SpecificUserData: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [userResponsesData, setUserResponsesData] = useState<UserResponses[]>(
    []
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all user data
  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { userData: UserData[] } = await response.json();
        setUserData(data.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAllUserData();
  }, []);

  // Fetch user responses data from the api/storeResponseData
  useEffect(() => {
    const fetchUserResponsesData = async () => {
      try {
        const response = await fetch("/api/showResponseData", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { userResponseData: UserResponses[] } =
          await response.json();
        setUserResponsesData(data.userResponseData);
      } catch (error) {
        console.error("Error fetching user response data:", error);
      }
    };

    fetchUserResponsesData();
  }, []);

  useEffect(() => {
    // Filter responses based on the selected user's ID
    const filteredResponses = userResponsesData.filter(
      (response) => response._id === selectedUserId
    );

    setUserResponsesData(filteredResponses);
  }, [selectedUserId]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="flex">
      <div className="flex-1">
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
              {userData.map((user) => (
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
      <div className="flex-1">
        <div className="min-h-screen container mx-auto max-w-screen-xl flex items-center justify-center">
          <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-4 text-center">
              User Responses Data
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userResponsesData?.map((response) => (
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
