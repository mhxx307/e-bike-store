// components/Register.js
import { useAuth } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/admin"); // Redirect to admin if already logged in
        }
    }, [user, router]);

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.status === 201) {
            setMessage("User registered successfully");
        } else {
            setMessage(data.error || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
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
                onClick={handleRegister}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Register
            </button>
        </div>
    );
}
