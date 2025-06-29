import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminDashboard() {
  const email = localStorage.getItem('email');

  const navigate = useNavigate();
  const [approvedNotes, setApprovedNotes] = useState([]);
  const [pendingNotes, setPendingNotes] = useState([]);
  const [filters, setFilters] = useState({
    title: 'all',
    search: '',
  });
  const fetchNotes = async () => {
    try {
      const approved = await axios.get('http://localhost:5000/api/notes/public');
      const pending = await axios.get('http://localhost:5000/api/notes/pending');
      setApprovedNotes(approved.data);
      setPendingNotes(pending.data);
    } catch {
      alert('Failed to load notes');
    }
  };

  const handleDecision = async (id, action) => {
    try {
      await axios.patch(`http://localhost:5000/api/notes/${action}/${id}`);
      fetchNotes(); // refresh after approve/reject
    } catch {
      alert(`Failed to ${action}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  const handledelete = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    alert("this note deleted")
    fetchNotes()
  }
  const filteredsubject = approvedNotes.filter((note) => {
    const matchTitle = filters.title === 'all' || note.title === filters.title;
    const matchSearch = note.subject.toLowerCase().includes(filters.search.toLowerCase());
    return matchTitle && matchSearch;
  });

  return (
    <div className="p-8 text-center">
      <h1>Welcome {email}</h1>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8 space-x-4">
        <button
          onClick={() => navigate('/admin/upload')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Notes
        </button>
        <button
          onClick={() => navigate('/admin/rejected')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rejected Notes
        </button>
      </div>
      <div className="flex flex-wrap justify-end gap-3 mb-4"></div>
      <select
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        className="border px-3 py-1 rounded"
      >
        <option value="all">All</option>
        <option value="s1">S1</option>
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
        placeholder="Search subject..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="border px-3 py-1 rounded"
      />

      <div />
      {/* ✅ Approved Notes */}
      <h2 className="text-xl font-semibold my-4">📚 Approved Notes</h2>
      {filteredsubject.length === 0 ? (
        <p>No approved notes.</p>
      ) : (
        filteredsubject.map(note => (
          <div key={note._id} className="border p-4 my-2 text-left rounded shadow">
            <p><strong>Title:</strong> {note.title}</p>
            <p><strong>Subject:</strong> {note.subject}</p>
              <p><strong>Submitted By:</strong> {note.uploadedBy}</p>
            

            <a href={note.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Download
            </a>
            <button className='bg-red-600 text-white px-3 py-1 rounded ml-10' onClick={() => { handledelete(note._id) }}>delete</button>
          </div>
        ))
      )}

      {/* ⏳ Pending Notes */}
      <h2 className="text-xl font-semibold my-4 mt-10">⏳ Pending Notes</h2>
      {pendingNotes.length === 0 ? (
        <p>No pending notes.</p>
      ) : (
        pendingNotes.map(note => (
          <div key={note._id} className="border p-4 my-2 text-left bg-yellow-100 rounded shadow">
            <p><strong>Title:</strong> {note.title}</p>
            <p><strong>Subject:</strong> {note.subject}</p>
            <p><strong>Uploaded By:</strong> {note.uploadedBy}</p>
            <a href={note.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              View PDF
            </a>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleDecision(note._id, 'approve')}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleDecision(note._id, 'reject')}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
