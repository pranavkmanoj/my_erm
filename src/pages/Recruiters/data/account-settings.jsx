import { useState } from "react";

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save settings (Replace with API call)
  const handleSave = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Account settings updated successfully.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
      <div className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={settings.currentPassword}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={settings.newPassword}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={settings.confirmPassword}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span>Enable Email Notifications</span>
        </label>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
