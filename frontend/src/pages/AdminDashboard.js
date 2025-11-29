import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';


function AdminDashboard() {
  
  const token = sessionStorage.getItem('token')
 const decoded = JSON.parse(atob(token.split('.')[1]));
const email=decoded.email
const id=decoded.id

  const navigate = useNavigate();
  const [pendingNotes, setPendingNotes] = useState([]);
  const fetchNotes = async () => {
    try {

      const pending = await API.get('/api/notes/pending');

      setPendingNotes(pending.data);
    } catch {
      alert('Failed to load notes');
    }
  };

  const handleDecision = async (id, action) => {
    try {
      
      await API.patch(`/api/notes/${action}/${id}`);
      fetchNotes(); // refresh after approve/reject
    } catch {
      alert(`Failed to ${action}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
 const handleLogout = () => {
  sessionStorage.clear(); // or sessionStorage.removeItem('token') etc.
  navigate('/admin/login'); // or user login
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Welcome back, <span className="font-semibold text-blue-700">{email}</span></p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() =>{
                 navigate('/admin/upload')
            } }
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
          >
            📤 Upload Notes
          </button>
          <button
            onClick={() => navigate('/admin/rejected')}
            className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
          >
            🗑️ Rejected Notes
          </button>
          <button
            onClick={() => navigate('/admin/view')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
          >
            📚 View Notes
          </button>
           <button
            onClick={() =>navigate(`/admin/change-password/${id}`)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
          >
            🔐 Change Password
          </button>
        </div>

        {/* Pending Notes Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            ⏳ <span>Pending Notes</span>
            {pendingNotes.length > 0 && (
              <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">{pendingNotes.length}</span>
            )}
          </h2>
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
                        onClick={() =>{
                          if(window.confirm('do you want to reject this file')){
                                   handleDecision(note._id, 'reject')
                          }
                               
                        } }
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

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
