import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email || !form.password || !form.confirmPassword || !form.secretKey) {
      alert('All fields are required');
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await api.post('/api/admin/send-otp', form);
      alert(res.data.message);
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert('Enter OTP');
      return;
    }

    try {
      const res = await api.post('/api/admin/verify-otp', {
        email: form.email,
        otp
      });
      alert(res.data.message);
      navigate('/admin/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Registration
          </h2>
          <p className="text-gray-500 mt-2">
            {!otpSent ? 'Create your admin account' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {!otpSent ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                type="email"
                name="email"
                placeholder="admin@example.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Secret Key</label>
              <input
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                type="text"
                name="secretKey"
                placeholder="Enter secret key"
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">OTP Code</label>
              <input
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 text-center text-2xl tracking-widest"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRegister;
