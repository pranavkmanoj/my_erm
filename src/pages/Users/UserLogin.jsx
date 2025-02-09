import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from './images/picture.png'; // Import the image

const UserLogin = () => {
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'recruiter'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userType = activeTab === 'user' ? 'users' : 'recruiters';
    const storedUsers = JSON.parse(localStorage.getItem(userType)) || [];
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
      alert('Login successful!');
      navigate(activeTab === 'user' ? '/upanel' : '/rpanel');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
      {/* Title with Tailwind Filter Effect and custom font */}
      <h1 className="text-4xl font-extrabold text-black mb-8 uppercase tracking-wide text-center font-poppins">
        Employee Recruitment System
      </h1>

      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Section - Image */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-8 bg-gray-100">
          <img src={img1} alt="Login Illustration" className="w-3/4" />
          <h2 className="text-xl font-bold mt-4 text-center text-gray-800">
            Connect. Apply. Succeed. Your future starts here.
          </h2>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
          <p className="text-center text-gray-600">Select your role to continue</p>

          {/* Tab Navigation */}
          <div className="relative flex border-b mt-6">
            <button
              className={`flex-1 text-center py-2 text-lg font-medium transition ${
                activeTab === 'user' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('user')}
            >
              User
            </button>
            <button
              className={`flex-1 text-center py-2 text-lg font-medium transition ${
                activeTab === 'recruiter' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('recruiter')}
            >
              Recruiter
            </button>

            {/* Underline Animation */}
            <div
              className={`absolute bottom-0 h-1 bg-blue-600 transition-all duration-300 ease-in-out ${
                activeTab === 'user' ? 'left-0 w-1/2' : 'left-1/2 w-1/2 bg-green-600'
              }`}
            ></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full text-white py-2 px-4 rounded-md transition ${
                activeTab === 'user' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Login as {activeTab === 'user' ? 'User' : 'Recruiter'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <Link to={activeTab === 'user' ? '/forgot-password' : '/forgot-password'} className="text-blue-600 font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to={activeTab === 'user' ? '/uregister' : '/rregister'} className="text-blue-600 font-medium hover:underline">
              Signup Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
