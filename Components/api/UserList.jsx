import { useEffect, useState } from 'react';
import { getUsers } from './getUsers';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUsers();
    }, []);

    if (error) return <div>{error}</div>;
    return (
        <ul>
            {users?.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}