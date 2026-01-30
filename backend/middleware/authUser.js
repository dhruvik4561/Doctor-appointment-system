import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import mongoose from "mongoose";

// admin authentication middleware

const authUser = async (req, res, next) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ message: "Unauthorized: Please log in" });
        }

        const userId = req.session.userId;
        console.log("Session Data:", req.session);


        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user data to request
        next(); 

    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({ success: false, message: "Authentication failed." });
    }
}
export default authUser
