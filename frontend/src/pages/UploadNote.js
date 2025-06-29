import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadNote() {
  const navigate = useNavigate();
  const email=localStorage.getItem("email")
  const [form, setForm] = useState({ title: '', subject: '' });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !form.title || !form.subject) {
      alert('All fields are required!');
      return;
    }

    const data = new FormData();
    data.append('title', form.title);
    data.append('subject', form.subject);
    data.append('file', file);
    data.append('uploadedBy', email);

    try {
      await axios.post('http://localhost:5000/api/notes/upload', data);
      alert('Note uploaded');
      navigate('/admin/home');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Upload Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
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
  );
}

export default UploadNote;
