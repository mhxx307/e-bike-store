// context/UserContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

const UserContext = createContext();

export const useAuth = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info (e.g., token and details)
    const router = useRouter();

    // Check for JWT token in localStorage when the app starts
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // You can expand this to store more user details
            const userDetails = JSON.parse(localStorage.getItem("userDetails"));
            setUser({ token, ...userDetails });
        }
    }, []);

    // Logout function to clear the user token and state
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        setUser(null);
        router.push("/login"); // Redirect to login page
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
