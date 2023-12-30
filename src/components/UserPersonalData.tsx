"use client";
import React, { useEffect, useState } from "react";
import { useUserResponsesContext } from "@/app/contexts/UserResponsesContext";
import { useUser } from "@/app/contexts/userData";
const UserPersonalData: React.FC = () => {
    const { userWithEmail } = useUser();
  const { userResponsesData } = useUserResponsesContext();
  const [selectedResponseData, setSelectedResponseData] = useState<
    any[] | null
  >(null);
  console.log("Frontend User Response:", userResponsesData);
  console.log("Frontend User Response:", userWithEmail?._id);

  useEffect(() => {
    if (userWithEmail !== null) {
      const matchingResponses = userResponsesData.filter(
        (response: any) => response?.id === userWithEmail?._id
      );
      console.log("Matching Response", matchingResponses);
      setSelectedResponseData(
        matchingResponses.length > 0 ? matchingResponses : null
      );
    } else {
      setSelectedResponseData(null);
    }
  }, [userResponsesData]);


  return (
    <div>
      <div>
        <div className="min-h-screen container mx-auto max-w-screen-xl flex items-center justify-center">
          <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-4 text-center">
              User Responses Data
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <b> Prompt: </b>
                        {response.prompt}
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
                        <b> Date: </b>{" "}
                        {new Date(response.currentTime).toLocaleString()}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Article : </b>
                        <div
                          className=""
                          dangerouslySetInnerHTML={{ __html: response.article }}
                          style={{ marginTop: "10px" }}
                        />
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

export default UserPersonalData;