const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");

const authMiddleware = async (req, res, next) => {

    try {
        // Extract token from Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.warn("❌ No token provided");
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded?.id || !decoded?.role) {
            console.warn("❌ Invalid token structure");
            return res.status(401).json({ error: "Invalid token structure" });
        }

        // Find the user based on role
        let user;
        if (decoded.role === "user") {
            user = await User.findById(decoded.id).select("-password");
        } else if (decoded.role === "recruiter") {
            user = await Recruiter.findById(decoded.id).select("-password");
        } else {
            console.warn("❌ Invalid role in token");
            return res.status(401).json({ error: "Unauthorized: Invalid role" });
        }

        // Check if user exists
        if (!user) {
            console.warn(`❌ ${decoded.role} not found`);
            return res.status(401).json({ error: `Unauthorized: ${decoded.role} not found` });
        }

        // Attach user details to req.user
        req.user = {
            id: user._id.toString(), // Ensure id is a string
            role: decoded.role,
            email: user.email,
            recruiterId: decoded.role === "recruiter" ? user._id.toString() : undefined, // Add recruiterId only for recruiters
        };

   

        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error("❌ Authentication error:", error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired, please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token." });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = authMiddleware;
