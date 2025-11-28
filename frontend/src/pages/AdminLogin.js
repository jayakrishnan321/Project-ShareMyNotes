 import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await api.post('/admin/login', form);
      alert(res.data.message);
       sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('email', res.data.email);
       sessionStorage.setItem('role', res.data.role);
      
     
      navigate('/admin/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <p className="text-gray-500 mt-2">Welcome back! Please login to continue</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
