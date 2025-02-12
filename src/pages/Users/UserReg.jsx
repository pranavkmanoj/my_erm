import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./images/pic.jpg"; // Import background image

const UserReg = () => {
  const [role, setRole] = useState("user"); // Default role: User
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      alert("Email already registered! Please log in.");
      return;
    }

    const newUser =
      role === "user"
        ? { role, name: formData.name, email, password }
        : { role, companyName: formData.companyName, email, password, bio: formData.bio };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful!");
    navigate("/ulogin");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={`shadow-lg rounded-lg p-8 border border-gray-200 transition-all backdrop-blur-md ${role === "user" ? "w-full max-w-2xl" : "w-full max-w-lg"
        } bg-white/70`} // Light transparent effect
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Register</h2>

        {/* Role Selection Tabs */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 text-lg font-medium border-b-4 transition-all ${role === "user" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
              }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`px-6 py-2 text-lg font-medium border-b-4 transition-all ${role === "recruiter" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
              }`}
            onClick={() => setRole("recruiter")}
          >
            Recruiter
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dynamic Name/Company Field */}
          {role === "user" ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
              placeholder="Full Name"
              required
            />
          ) : (
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
              placeholder="Company Name"
              required
            />
          )}

          {/* Email */}
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
            placeholder="Email"
            required
          />

          {/* Password */}
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
            placeholder="Password"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
            placeholder="Confirm Password"
            required
          />

          {/* Bio Field for Recruiters */}
          {role === "recruiter" && (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
              placeholder="Short Company Bio"
              rows="3"
              required
            ></textarea>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register as {role === "user" ? "User" : "Recruiter"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account? <Link to="/" className="underline text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserReg;
