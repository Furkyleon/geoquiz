import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

function Profile() {
    const userContext = useContext(UserContext);
    const profile = userContext.user;

    if (!profile) {
        return <Navigate replace to="/login" />;
    }

    return (
        <>
            <h1>User profile</h1>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
        </>
    );
}

export default Profile;
