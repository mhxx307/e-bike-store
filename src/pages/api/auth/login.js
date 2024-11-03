// pages/api/auth/login.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const { method } = req;

    await connectDB();

    if (method === "POST") {
        const { email, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Invalid email or password" });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.status(200).json({ token, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
