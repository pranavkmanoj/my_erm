import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axiosInstance";
import logo from "../../assets/logo.webp";

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, password, confirmPassword, name, companyName, bio } = formData;

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password)) newErrors.password = "Password doesn't meet requirements";

    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";

    if (role === "user" && !name) newErrors.name = "Name is required";
    if (role === "recruiter" && !companyName) newErrors.companyName = "Company name is required";
    if (role === "recruiter" && !bio) newErrors.bio = "Bio is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = role === "user"
        ? { role, name: formData.name, email: formData.email, password: formData.password }
        : {
          role, companyName: formData.companyName, email: formData.email,
          password: formData.password, bio: formData.bio
        };

      const response = await axios.post("/auth/register", userData);

      if (response.data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => navigate("/ulogin"), 1500);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FB5607] to-[#140000] relative p-4">
      {/* Logo at top-left */}
      <div
        className="absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Company Logo"
          className="w-[90px] md:w-[120px]"
        />
      </div>

      <ToastContainer position="top-center" autoClose={3000} />

      <div className="w-full max-w-md">
        <div className="bg-[#F7F7F7] p-8 rounded-xl shadow-2xl border border-[#EA033F]/20">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#140000]">
              {role === "user" ? "Find Your Dream Job" : "Find Great Talent"}
            </h1>
            <p className="text-[#140000]/80 mt-1">Create your free account</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-[#140000]/10 p-1 rounded-lg mb-6">
            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${role === "user"
                ? "bg-white shadow-sm text-[#EA033F]"
                : "text-[#140000] hover:text-[#EA033F]"}`}
              onClick={() => setRole("user")}
            >
              Job Seeker
            </button>
            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${role === "recruiter"
                ? "bg-white shadow-sm text-[#FB5607]"
                : "text-[#140000] hover:text-[#FB5607]"}`}
              onClick={() => setRole("recruiter")}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {role === "user" ? (
              <div>
                <label className="block text-sm font-medium text-[#140000] mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EA033F] focus:border-transparent ${errors.name ? "border-[#EA033F]" : "border-[#140000]/20"}`}
                />
                {errors.name && <p className="text-[#EA033F] text-xs mt-1">{errors.name}</p>}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-[#140000] mb-1">Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FB5607] focus:border-transparent ${errors.companyName ? "border-[#EA033F]" : "border-[#140000]/20"}`}
                />
                {errors.companyName && <p className="text-[#EA033F] text-xs mt-1">{errors.companyName}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#140000] mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EA033F] focus:border-transparent ${errors.email ? "border-[#EA033F]" : "border-[#140000]/20"}`}
              />
              {errors.email && <p className="text-[#EA033F] text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#140000] mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                placeholder="Create a password"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EA033F] focus:border-transparent ${errors.password ? "border-[#EA033F]" : "border-[#140000]/20"}`}
              />
              {errors.password && <p className="text-[#EA033F] text-xs mt-1">{errors.password}</p>}

              {/* Password Rules (shown only when password field is focused) */}
              {isPasswordFocused && (
                <div className="mt-2 text-xs text-[#140000]/80">
                  <p className="font-medium mb-1">Password must contain:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>At least 8 characters</li>
                    <li>At least one uppercase letter (A-Z)</li>
                    <li>At least one lowercase letter (a-z)</li>
                    <li>At least one number (0-9)</li>
                    <li>At least one special character (!@#$%^&*)</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#140000] mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EA033F] focus:border-transparent ${errors.confirmPassword ? "border-[#EA033F]" : "border-[#140000]/20"}`}
              />
              {errors.confirmPassword && <p className="text-[#EA033F] text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {role === "recruiter" && (
              <div>
                <label className="block text-sm font-medium text-[#140000] mb-1">Company Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your company..."
                  rows="3"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FB5607] focus:border-transparent ${errors.bio ? "border-[#EA033F]" : "border-[#140000]/20"}`}
                ></textarea>
                {errors.bio && <p className="text-[#EA033F] text-xs mt-1">{errors.bio}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${loading
                ? 'bg-[#FB5607]/70 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FB5607] to-[#EA033F] hover:from-[#FB5607]/90 hover:to-[#EA033F]/90 shadow-md hover:shadow-[#EA033F]/40'
                } text-white`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#140000]/80">
            <p>Already have an account?{" "}
              <Link to="/ulogin" className="font-medium text-[#EA033F] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReg;