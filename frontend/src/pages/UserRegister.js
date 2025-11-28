import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function UserRegister() {

  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/register', form);
      alert('Registered successfully!');
      navigate('/user/login')
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-full mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            User Register
          </h2>
          <p className="text-gray-500 mt-2">Create your account to get started</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegister;
