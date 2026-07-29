import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (user, authToken = null) => {
        const tokenToStore = authToken ?? JSON.stringify(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", tokenToStore);
        setUser(user);
        setToken(tokenToStore);
    }
    const logout = () => {
        localStorage.clear();
        setUser(null);
        setToken(null);
    }

    return (
        <UserContext.Provider value={{
            user,
            token,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);