const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes"); 

const app = express(); // Initialize app first

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const allowedOrigins = ["http://localhost:5174", "http://localhost:5176"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you're using cookies or authorization headers
  })
);



app.use(express.json()); // Ensure JSON parsing is enabled

// Import routes
const authRoutes = require("./routes/auth"); // Ensure correct path

// Routes
app.use("/api/jobs", jobRoutes); // Use job routes


// Use routes with a prefix
app.use("/api/auth", authRoutes); 
const PORT = process.env.PORT || 5001;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


