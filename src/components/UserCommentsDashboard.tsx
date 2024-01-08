"use client";
import { useUserCommentsContext } from '@/app/contexts/UserCommentsContext';
const UserCommentsDashboard: React.FC = () => {
  const { userCommentsData } = useUserCommentsContext();
const calculateTotalTokensUsed = () => {
  let totalTokensUsed = 0;
  userCommentsData?.forEach((response: any) => {
    totalTokensUsed += response.totalTokensUsed || 0;
  });
  return totalTokensUsed;
};

const totalTokensUsed = calculateTotalTokensUsed();
console.log(userCommentsData)
  return (
    <div className="min-h-screen container mx-auto ms-32 max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-xl flex items-center justify-center">
      <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2 min-w-full my-6">
        <h1 className="text-3xl font-bold mb-4 text-center">All Users Comments Data</h1>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-center">Total Tokens Used: {totalTokensUsed}</h2>
        </div>
        <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {userCommentsData?.map((response: any) => (
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
  );
};

export default UserCommentsDashboard;
