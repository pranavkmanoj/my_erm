import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../axiosInstance';
import logo from "../../assets/logo.webp";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/admin/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('adminData', JSON.stringify(res.data));
      navigate('/apanel');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FB5607] to-[#140000] relative">
      {/* Logo at top-left */}
      <div
        className="absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Company Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="bg-black p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#FB5607]/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-gray-300">Secure access to administration dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[#EA033F]/20 text-white rounded-lg text-sm text-center border border-[#EA033F]/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FB5607] focus:border-transparent"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FB5607] focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${loading
              ? 'bg-[#FB5607]/70 cursor-not-allowed'
              : 'bg-[#FB5607] hover:bg-[#EA033F] shadow-md hover:shadow-[#EA033F]/40'
              } text-white`}
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>For authorized personnel only</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;