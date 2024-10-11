// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: { type: String, default: "user" }, // Default role is 'user'
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
