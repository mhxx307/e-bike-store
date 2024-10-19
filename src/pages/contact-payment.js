// pages/contact-payment.js
import { useState } from "react";

const ContactForPaymentPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
        // const response = await fetch("/api/contact", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ name, email, message }),
        // });
        // if (response.ok) {
        //     alert("Your contact request has been sent!");
        // } else {
        //     alert("Something went wrong. Please try again.");
        // }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl mb-4 font-bold text-gray-700">
                    Contact for Payment
                </h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-3 w-full px-3 py-2 border rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3 w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mb-3 w-full px-3 py-2 border rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Send Contact Request
                </button>
            </form>
        </div>
    );
};

export default ContactForPaymentPage;
