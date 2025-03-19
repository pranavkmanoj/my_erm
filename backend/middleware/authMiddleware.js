const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.warn("❌ No token provided or incorrect format");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1].trim();

        // ✅ Verify and decode JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            console.warn("❌ Invalid token structure");
            return res.status(401).json({ message: "Invalid token structure" });
        }

        // ✅ Attach user details to `req.user`
        req.user = { id: decoded.id, role: decoded.role || "user" };


        next();
    } catch (error) {
        console.error("❌ Authentication error:", error.message);
        return res.status(401).json({
            message: error.name === "TokenExpiredError"
                ? "Token expired, please log in again."
                : "Invalid token."
        });
    }
};

module.exports = authMiddleware;
