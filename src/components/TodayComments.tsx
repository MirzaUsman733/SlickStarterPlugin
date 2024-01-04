"use client";
import { useUserCommentsContext } from "@/app/contexts/UserCommentsContext";
const TodayComments: React.FC = () => {
  
 const { userCommentsData } = useUserCommentsContext();
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const todayResponses = userCommentsData.filter((response: any) =>
    isToday(new Date(response.currentTime))
  );

  return (
    <div className="min-h-screen container mx-auto  ms-32 max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-xl flex items-center justify-center">
      <div className="bg-gray-300 bg-opacity-20 p-8 shadow-2xl text-black flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Today's Users Data
        </h1>
        <ul className="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
          {todayResponses.map((response: any) => (
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

export default TodayComments;
