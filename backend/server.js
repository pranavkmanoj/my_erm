const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require('path'); 
const fs = require('fs');

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",         // Local frontend
      "http://localhost:5174",         // Another local frontend (if needed)
      "https://erm-v0ek.onrender.com"  // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Import routes AFTER initializing `app`
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const jobApplicationRoutes = require("./routes/jobApplication"); 
const interviewRoutes = require("./routes/interview");
const adminRoutes = require("./routes/adminDash");

// ✅ Register routes with correct base paths
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/user", userRoutes);
app.use("/job-applications", jobApplicationRoutes);
app.use("/interview", interviewRoutes);
app.use("/admin", adminRoutes);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // recursive: true creates parent directories if needed
}

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Debugging: Check all registered routes
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✅ Route registered: ${Object.keys(r.route.methods).join(", ").toUpperCase()} ${r.route.path}`);
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
