import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function UserUpload() {
    const navigate = useNavigate();
      const email = localStorage.getItem("email")
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
      await axios.post('http://localhost:5000/api/notes/upload-by-user', data);
      alert('Note uploaded and sent to admin');
      navigate('/user/dashboard')
    } catch {
      alert('Upload failed');
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Upload Note</h2>
      <form onSubmit={handleUpload}>
        <select
          className="w-full p-2 border rounded mb-3"
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

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <input
          type="file"
          accept=".pdf"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default UserUpload
