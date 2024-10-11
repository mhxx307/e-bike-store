// components/Login.js
import { useAuth } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUser, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/admin"); // Redirect to admin if already logged in
        }
    }, [user, router]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.status === 200) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userDetails", JSON.stringify(data.user)); // Store user details
            setUser({ token: data.token, ...data.user }); // Set user details in context
            router.push("/admin");
            setMessage("Login successful");
        } else {
            setMessage(data.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <input
                className="border p-2 mb-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border p-2 mb-4"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {message && <p>{message}</p>}

            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Login
            </button>
        </div>
    );
}
