"use client";
import { useUserDataContext } from "@/app/contexts/UserDataContext";

const UserDataDashboard: React.FC = () => {

  const { userData, loading } = useUserDataContext();


  return (
    <div>
      <div className="grid place-items-center h-screen ms-32 max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-xl">
        <div className="shadow-2xl bg-gray-300 shadow-slate-700 text-black p-8 bg-opacity-20 bg-zince-300/10 flex flex-col gap-2 my-6">
          <h1 className="text-4xl font-bold text-center mb-4">All Users</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SR.NO
                </th>
                <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any, index: any) => (
                <tr key={user._id}>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </div>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.email}
                    </div>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.role}
                    </div>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.approved}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDataDashboard;