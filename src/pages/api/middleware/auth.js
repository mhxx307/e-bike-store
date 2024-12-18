// middleware/auth.js
import jwt from "jsonwebtoken";

export const authenticate = (handler) => async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return handler(req, res);
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
