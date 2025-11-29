import React, { useEffect, useState } from 'react';
import API from '../api';

function AdminReview() {
  const [pendingNotes, setPendingNotes] = useState([]);

  const fetchPending = () => {
    API.get('/api/notes/pending')
      .then((res) =>{ setPendingNotes(res.data)})
        .catch(() => alert('Error loading pending notes'));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleDecision = async (id, action) => {
    try {
      await API.patch(`/api/notes/${action}/${id}`);
      fetchPending();
    } catch {
      alert('Action failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            ⏳ Pending Notes
            {pendingNotes.length > 0 && (
              <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">{pendingNotes.length}</span>
            )}
          </h1>
          
          {pendingNotes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No pending notes at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingNotes.map(note => (
                <div key={note._id} className="border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Title</p>
                      <p className="text-gray-800 font-bold text-lg">{note.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Subject</p>
                      <p className="text-gray-800">{note.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Uploaded By</p>
                      <p className="text-gray-800">{note.uploadedBy}</p>
                    </div>
                    <a 
                      href={note.fileUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-block text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 hover:decoration-blue-800 transition-colors"
                    >
                      📄 View PDF
                    </a>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleDecision(note._id, 'approve')}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleDecision(note._id, 'reject')}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminReview;
