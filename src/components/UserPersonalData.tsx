'use client';
import React, { useEffect, useState } from 'react';
import { useUserResponsesContext } from '@/app/contexts/UserResponsesContext';
import { useUser } from '@/app/contexts/userData';
const UserPersonalData: React.FC = () => {
  const { userWithEmail } = useUser();
  const { userResponsesData } = useUserResponsesContext();
  const [selectedResponseData, setSelectedResponseData] = useState<
    any[] | null
  >(null);
  const [openArticleIds, setOpenArticleIds] = useState<string[]>([]);
  useEffect(() => {
    if (userWithEmail && userResponsesData.length > 0) {
      const matchingResponses = userResponsesData?.filter(
        (response: any) => response?.id === userWithEmail?._id
      );
      setSelectedResponseData(
        matchingResponses?.length > 0 ? matchingResponses : null
      );
    } else {
      setSelectedResponseData(null);
    }
  }, [userResponsesData, userWithEmail]);

  const handleReadArticle = (responseId: string) => {
    setOpenArticleIds((prevIds) => {
      if (prevIds?.includes(responseId)) {
        return prevIds?.filter((id) => id !== responseId);
      } else {
        return [...prevIds, responseId];
      }
    });
  };

  const isArticleOpen = (responseId: string) => {
    return openArticleIds.includes(responseId);
  };

  const toggleArticleVisibility = (responseId: string) => {
    setOpenArticleIds((prevIds) => {
      if (prevIds.includes(responseId)) {
        return prevIds.filter((id) => id !== responseId);
      } else {
        return [...prevIds, responseId];
      }
    });
  };
  return (
    <div>
      <div>
        <div className="min-h-screen container mx-auto max-w-screen-xl flex justify-center mt-28">
          <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black gap-2 min-w-[80vw] ">
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
                        {response?.email}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Prompt: </b>
                        {response?.prompt}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> SelectedTitle: </b>
                        {response?.selectedTitle}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Total Tokens Used: </b>
                        {response?.totalTokensUsed}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Date: </b>{' '}
                        {new Date(response.currentTime).toLocaleString()}
                      </li>
                      <li className="border-b border-solid border-blue-500 my-2">
                        <b> Article : </b>
                        <button
                          onClick={() => toggleArticleVisibility(response?._id)}
                          className="my-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          {isArticleOpen(response?._id)
                            ? 'Show Less'
                            : 'Read Article'}
                        </button>
                        {isArticleOpen(response?._id) && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: response.article,
                            }}
                            style={{ marginTop: '10px' }}
                          />
                        )}
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
