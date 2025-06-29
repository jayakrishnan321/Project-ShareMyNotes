import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', subject: '' });
  const [file, setFile] = useState(null);

  const email = localStorage.getItem('email')
  useEffect(() => {
    axios.get('http://localhost:5000/api/notes/public')
      .then(res => setNotes(res.data))
      .catch(() => alert('Failed to fetch notes'));
  }, []);

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
    } catch {
      alert('Upload failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded mr-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          className="p-2 border rounded mr-2"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <input
          type="file"
          accept=".pdf"
          className="p-2 border rounded mr-2"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Approved Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note._id} className="mb-2">
            {note.title} - {note.subject} -{' '}
            <a href={note.fileUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
