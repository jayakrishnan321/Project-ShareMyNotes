import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/user/login', form);
       sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('email', res.data.email);
       sessionStorage.setItem('role', res.data.role);
      navigate('/user/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">User Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}

export default UserLogin;
