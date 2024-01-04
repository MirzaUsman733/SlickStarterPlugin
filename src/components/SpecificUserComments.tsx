'use client';
import React, { useEffect, useState } from 'react';
import { useUserCommentsContext } from '@/app/contexts/UserCommentsContext';
import { useUserDataContext } from '@/app/contexts/UserDataContext';
const SpecificUserComments: React.FC = () => {
  const { userCommentsData } = useUserCommentsContext();
  const { userData, loading } = useUserDataContext();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedResponseData, setSelectedResponseData] = useState<
    any[] | null
  >(null);
  const [totalTokensUsed, setTotalTokensUsed] = useState<number | null>(null);
  const [totalPromptsUsed, setTotalPromptsUsed] = useState<number | null>(null);

  useEffect(() => {
    if (selectedUserId) {
      const matchingResponses = userCommentsData.filter(
        (response: any) => response.id === selectedUserId
      );
      const totalTokens = matchingResponses.reduce(
        (sum: any, response: any) => sum + response.totalTokensUsed,
        0
      );
      const totalPrompts = matchingResponses.length;
      setTotalPromptsUsed(totalPrompts);
      setTotalTokensUsed(totalTokens);
      setSelectedResponseData(
        matchingResponses.length > 0 ? matchingResponses : null
      );
    } else {
      setTotalTokensUsed(null);
      setSelectedResponseData(null);
      setTotalPromptsUsed(null);
    }
  }, [selectedUserId, userCommentsData]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <div className="max-w-screen-md mx-auto">
        <div className="shadow-2xl shadow-slate-700 text-black ms-32 p-8 bg-opacity-20 bg-zince-300/10 flex flex-col gap-2 my-6">
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
                <tr
                  key={user._id}
                  onClick={() => handleUserSelect(user._id)}
                  className="list-group-item mb-2 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 p-3">
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
      <div className="ms-32">
        <div className="min-h-screen container mx-auto ms-32 max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-xl flex items-center justify-center">
          <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-4 text-center">
              User Responses Data
            </h1>
            {totalTokensUsed !== null && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  Total Tokens Used: {totalTokensUsed}
                </h2>
              </div>
            )}
            {totalPromptsUsed !== null && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  Total Prompts Used: {totalPromptsUsed}
                </h2>
              </div>
            )}
            <ul className="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
              {selectedResponseData?.map((response: any) => (
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
                        <b> SelectedTitle: </b>
                        {response.selectedTitle}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Total Tokens Used: </b>
                        {response?.totalTokensUsed}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Date: </b>{' '}
                        {new Date(response.currentTime).toLocaleString()}
                      </li>
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

export default SpecificUserComments;
