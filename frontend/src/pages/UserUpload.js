import React from 'react'
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function UserUpload() {
    const navigate = useNavigate();
      const email = sessionStorage.getItem("email")
      const [form, setForm] = useState({ title: '', subject: '' });
      const [file, setFile] = useState(null);
    
     const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !form.title || !form.subject) return alert('Fill all fields');

    const data = new FormData();
    data.append('title', form.title);
    data.append('subject', form.subject);
    data.append('file', file);
    data.append('uploadedBy', email); // ✅ use username from token


    try {
      await api.post('/api/notes/upload-by-user', data);
      alert('Note uploaded and sent to admin');
      navigate('/user/dashboard')
    } catch {
      alert('Upload failed');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-full mb-4">
            <span className="text-3xl">📤</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Upload Note
          </h2>
          <p className="text-gray-500 mt-2">Submit a note for admin review</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Semester</label>
            <select
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            >
              <option value="">Select Semester</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
              <option value="S6">S6</option>
              <option value="S7">S7</option>
              <option value="S8">S8</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              placeholder="Enter subject name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">PDF File</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg"
          >
            📤 Upload Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserUpload
