import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminReview() {
  const [pendingNotes, setPendingNotes] = useState([]);

  const fetchPending = () => {
    axios.get('http://localhost:5000/api/notes/pending')
      .then((res) =>{ setPendingNotes(res.data)})
        .catch(() => alert('Error loading pending notes'));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleDecision = async (id, action) => {
    try {
      await axios.patch(`http://localhost:5000/api/notes/${action}/${id}`);
      fetchPending();
    } catch {
      alert('Action failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pending Notes</h1>
      {pendingNotes.length === 0 && <p>No pending notes.</p>}
      {pendingNotes.map(note => (
        <div key={note._id} className="border p-4 mb-4">
          <p><strong>Title:</strong> {note.title}</p>
          <p><strong>Subject:</strong> {note.subject}</p>
          <p><strong>Uploaded By:</strong> {note.uploadedBy}</p>
          <a href={note.fileUrl} target="_blank" className="text-blue-600 underline" rel="noreferrer">
            View PDF
          </a>
          <div className="mt-2">
            <button
              onClick={() => handleDecision(note._id, 'approve')}
              className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleDecision(note._id, 'reject')}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminReview;
