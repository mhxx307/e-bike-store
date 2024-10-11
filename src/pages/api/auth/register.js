// pages/api/auth/register.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User"; // you'll create this User model
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    const { method } = req;

    await connectDB();

    if (method === "POST") {
        const { email, password } = req.body;

        try {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({ email, password: hashedPassword });
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
