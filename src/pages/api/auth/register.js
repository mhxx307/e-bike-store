// pages/api/auth/register.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User"; // you'll create this User model

export default async function handler(req, res) {
    const { method } = req;

    await connectDB();

    if (method === "POST") {
        const { email, password } = req.body;
        try {
            const user = new User({ email, password });
            await user.save();
            res.status(201).json({
                message: "User created successfully",
                user,
            });
        } catch (error) {
            res.status(400).json({ error: "Error creating user" });
        }
    }
}
