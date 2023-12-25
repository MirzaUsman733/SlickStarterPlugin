// pages/users/[userDataInfo].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const page: React.FC = () => {
  const router = useRouter();
  const { userDataInfo } = router.query;
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userDataInfo}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: { user: UserData } = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(`Error fetching user details for user ${userDataInfo}:`, error);
      }
    };

    if (userDataInfo) {
      fetchUser();
    }
  }, [userDataInfo]);

  if (!userDataInfo || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <p>
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-bold">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
};

export default page;
