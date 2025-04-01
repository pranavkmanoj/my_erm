import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";

const PasswordReset = ({ token }) => {
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    resettingPassword: false
  });

  const validatePassword = (password) => {
    const requirements = [
      { regex: /.{8,}/, message: "Must be at least 8 characters" },
      { regex: /[A-Z]/, message: "Must contain uppercase letter" },
      { regex: /[a-z]/, message: "Must contain lowercase letter" },
      { regex: /[0-9]/, message: "Must contain number" },
      { regex: /[@$!%*?&]/, message: "Must contain special character" }
    ];

    const failed = requirements.find(req => !req.regex.test(password));
    return failed ? failed.message : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordReset = async () => {
    if (state.newPassword !== state.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const error = validatePassword(state.newPassword);
    if (error) {
      toast.error(error);
      return;
    }

    setState(prev => ({ ...prev, resettingPassword: true }));

    try {
      await axiosInstance.put("/user/reset-password", {
        currentPassword: state.currentPassword,
        newPassword: state.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Password updated successfully");
      setState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        resettingPassword: false
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
      setState(prev => ({ ...prev, resettingPassword: false }));
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={state.currentPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={state.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handlePasswordReset}
          disabled={state.resettingPassword}
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {state.resettingPassword ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;