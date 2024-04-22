import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // custom hook
    const [userAuth, setUserAuth] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const loginAuth = async (data) => {
        setUserAuth(data);
        navigate("/");
    };

    // call this function to sign out logged in user
    const logoutAuth = () => {
        setUserAuth(null);
        navigate("/home", { replace: true });
    };

    const value = useMemo(
        () => ({
            userAuth,
            loginAuth,
            logoutAuth,
        }),
        [userAuth]
    );
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};