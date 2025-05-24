import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Profile() {
    const userContext = useContext(UserContext);
    const profile = userContext.user;

    if (!profile) {
        return <Navigate replace to="/login" />;
    }

    return (
        <>
            <h1>User Profile</h1>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>

            <div style={{ marginTop: "1rem" }}>
                <Link
                    to="/quiz-history"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    View Quiz History
                </Link>
            </div>
        </>
    );
}

export default Profile;
