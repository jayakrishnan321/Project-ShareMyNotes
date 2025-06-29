import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={() => navigate('/admin/upload')}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
      >
        Upload Notes
      </button>
      <button
        onClick={() => navigate('/admin/view')}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        View Uploaded Notes
      </button>
    </div>
  );
}

export default AdminDashboard;
