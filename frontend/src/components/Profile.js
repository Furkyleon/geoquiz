import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function Profile() {
    const { user } = useContext(UserContext);
    if (!user) return <Navigate replace to="/login" />;

    return (
        <div className="container card profile">
            <h1 className="heading">User Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <Link
                to="/quiz-history"
                className="button button--secondary profile__link"
            >
                View Quiz History
            </Link>
        </div>
    );
}
