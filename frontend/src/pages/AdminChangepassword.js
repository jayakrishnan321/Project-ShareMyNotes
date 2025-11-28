import React from 'react'
import api from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminChangepassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const id = decoded.id

    const handleSubmit = async (id) => {
  if (newPassword !== confirmPassword) {
    alert("New and confirm passwords do not match");
    return;
  }

  try {
    const res = await api.put(
      `/admin/change-password/${id}`,
      { oldPassword, newPassword }
    );
    alert(res.data.msg || "Password updated successfully");

    // Delay navigation to allow alert to show
    setTimeout(() => {
      navigate("/admin/Home");
    }, 1000);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Something went wrong");
  }
};

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // prevent page reload
                    handleSubmit(id);
                }}
                className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-200"
            >
                <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
                        <span className="text-3xl">🔑</span>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Change Password
                    </h2>
                    <p className="text-gray-500 mt-2">Update your account password</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
                        <input
                            type="password"
                            placeholder="Enter current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
                    >
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminChangepassword
