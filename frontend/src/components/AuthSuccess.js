import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/userContext";

export default function AuthSuccess() {
    const { setUserContext } = useContext(UserContext);
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const token = params.get("token");

        if (token) {
            const { id, username, email } = jwtDecode(token);
            setUserContext({
                user: { id, username, email },
                token,
            });
            navigate("/", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    }, []);

    return <p>Logging you in…</p>;
}
