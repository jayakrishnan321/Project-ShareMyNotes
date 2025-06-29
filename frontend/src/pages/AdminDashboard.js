import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminDashboard() {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const [pendingNotes, setPendingNotes] = useState([]);
  const fetchNotes = async () => {
    try {
   
      const pending = await axios.get('http://localhost:5000/api/notes/pending');
   
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
   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/admin/login'); // or your login route
  };
  

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
        <button
          onClick={() => navigate('/admin/view')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Notes
        </button>
      </div>
      <div className="flex flex-wrap justify-end gap-3 mb-4"></div>
      <div />
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
       <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
    </div>
  );
}

export default AdminDashboard;
