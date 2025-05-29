import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/userContext";

export default function AuthSuccess() {
    const { setUserContext } = useContext(UserContext);
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
        // Only run once on mount
        const params = new URLSearchParams(search);
        const token = params.get("token");

        if (token) {
            // decode user info out of it
            const { id, username, email } = jwtDecode(token);
            setUserContext({
                user: { id, username, email },
                token,
            });
            // replace history so coming back doesn’t re-trigger this
            navigate("/", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
        // empty deps = only on first mount
    }, []); // ← no setUserContext or navigate here

    return <p>Logging you in…</p>;
}
