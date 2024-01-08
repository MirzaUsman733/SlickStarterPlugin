import { useEffect, useState } from 'react';

const Approval = () => {
    const [unapprovedUsers, setUnapprovedUsers] = useState([]);

    useEffect(() => {
        // Fetch unapproved users initially
        fetchUnapprovedUsers();

        // Set up a polling interval to fetch updates every 60 seconds (adjust as needed)
        const intervalId = setInterval(fetchUnapprovedUsers, 60000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const fetchUnapprovedUsers = async () => {
        try {
            const response = await fetch('/api/unapprovedUsers');
            const data = await response.json();
            setUnapprovedUsers(data);
        } catch (error) {
            console.error('Error fetching unapproved users', error);
        }
    };

    const approveUser = async (userId) => {
        try {
            const response = await fetch('/api/approvedUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                // Fetch unapproved users after approval
                fetchUnapprovedUsers();
            } else {
                console.error('Failed to approve user');
            }
        } catch (error) {
            console.error('Error approving user', error);
        }
    };

    return (
        <div>
            <div className="mt-10 ms-32 bg-gray-300 bg-opacity-20 p-8 shadow-2xl">
                <h2 className="text-center text-4xl font-bold mb-16">Unapproved Users</h2>
                <table className="min-w-full divide-y divide-gray-200 text-center mt-20 ">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SR.NO
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                             <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Approval
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {unapprovedUsers.map((user, index) => (
                    <tr key={user._id}>
                        <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                                {index + 1}
                            </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                                {user?.name}
                            </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                                {user?.email}
                            </div>
                        </td>
                           <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                                {user?.role}
                            </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                                <button className="py-3 px-5 bg-blue-800 text-white rounded-full text-center" onClick={() => { approveUser(user._id) }}>Approve User</button>
                            </div>
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Approval;
