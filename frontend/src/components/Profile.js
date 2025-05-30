// src/components/Profile.jsx
import { useContext } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function Profile() {
    const { user, token, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) return <Navigate replace to="/login" />;

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account?"))
            return;
        try {
            const res = await fetch(
                `http://localhost:3001/users/delete/${user.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.status === 204) {
                clearUser();
                navigate("/");
            } else {
                const err = await res.json();
                alert(err.message || "Failed to delete account");
            }
        } catch (e) {
            console.error("Delete failed", e);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container card profile text-center">
            <h1 className="heading">User Profile</h1>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <div>
                <Link
                    to="/quiz-history"
                    className="button button-primary profile_link"
                >
                    View Quiz History
                </Link>
            </div>

            <button
                onClick={handleDelete}
                className="button btn-delete"
                style={{ marginTop: "1rem" }}
            >
                Delete Account
            </button>
        </div>
    );
}
