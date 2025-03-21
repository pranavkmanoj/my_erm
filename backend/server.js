const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ✅ Initialize Express app first
const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both
    methods: ["GET", "POST", "PUT", "DELETE"],
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
const interviewRoutes = require("./routes/interviews");

// ✅ Register routes with correct base paths
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/interviews", interviewRoutes); 


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
