import { useEffect, useState } from "react";
import User from "./User";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch("http://localhost:3001/users", {
                    credentials: "include", // include cookies if needed
                });
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        getUsers();
    }, []);

    return (
        <>
            <h3>Users:</h3>
            <ul>
                {users.map((user) => (
                    <User user={user} key={user._id} />
                ))}
            </ul>
        </>
    );
}

export default Users;
