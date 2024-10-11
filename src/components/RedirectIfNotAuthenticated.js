import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/UserContext";
import { useRouter } from "next/router";

const RedirectIfNotAuthenticated = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            // User is still being checked
            setLoading(true);
        } else if (!user) {
            // User is not authenticated
            router.push("/login");
        } else if (
            user.role === "user" &&
            router.pathname.startsWith("/admin")
        ) {
            // User is authenticated but not an admin, redirect to home
            router.push("/");
        } else {
            // User is authenticated and has access
            setLoading(false);
        }
    }, [user, router]);

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading state
    }

    // If the user is authenticated and has access, render the children
    return children;
};

export default RedirectIfNotAuthenticated;
