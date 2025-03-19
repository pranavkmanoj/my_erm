import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "./images/pic.jpg";
import axios from "../../axiosInstance";

const UserReg = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setFormData({
      name: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password, confirmPassword, name, companyName, bio } = formData;

  if (!email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!validatePassword(password)) {
    alert(
      "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character."
    );
    return;
  }

  const userData =
    role === "user"
      ? { role, name, email, password }
      : { role, companyName, email, password, bio };

  try {
    setLoading(true);
    const response = await axios.post("/auth/register", userData);
    console.log("Response:", response.data); // Debugging

    if (response.data.success) {
      alert("Successfully registered!");
      setTimeout(() => {
        navigate("/ulogin");
      }, 0);
    } else {
      alert(response.data.message || "Registration failed. Try again.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.response?.data?.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div
        className={`shadow-lg rounded-lg p-8 border border-gray-200 bg-white/70 ${role === "user" ? "w-full max-w-2xl" : "w-full max-w-lg"
          }`}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
          Register
        </h2>

        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 text-lg font-medium border-b-4 transition-all ${role === "user"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500"
              }`}
            onClick={() => handleRoleChange("user")}
          >
            User
          </button>
          <button
            className={`px-6 py-2 text-lg font-medium border-b-4 transition-all ${role === "recruiter"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500"
              }`}
            onClick={() => handleRoleChange("recruiter")}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "user" ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
              placeholder="Full Name"
              required
            />
          ) : (
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
              placeholder="Company Name"
              required
            />
          )}

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
            placeholder="Password"
            required
          />

          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
            placeholder="Confirm Password"
            required
          />

          {role === "recruiter" && (
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full p-3 border border-gray-400 rounded bg-white/80 focus:ring focus:ring-blue-300"
              placeholder="Short Company Bio"
              rows="3"
              required
            ></textarea>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : `Register as ${role === "user" ? "User" : "Recruiter"}`}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/ulogin" className="underline text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserReg;
