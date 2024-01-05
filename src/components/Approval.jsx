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
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Unapproved Users</h2>
                {unapprovedUsers.map((user) => (
                    <div key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <button onClick={() => { approveUser(user._id) }}>Approve User</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Approval;
