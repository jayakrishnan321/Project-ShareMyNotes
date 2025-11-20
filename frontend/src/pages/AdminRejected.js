import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'


function AdminRejected() {
    const navigate=useNavigate()
     const [rejectedNotes, setrejecteddNotes] = useState([]);
    const fetchrejected=async ()=>{
        await axios.get("http://localhost:5000/api/notes/rejected").then((response)=>{
            console.log(response.data)
            setrejecteddNotes(response.data)
        })
    }
     const handledelete = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    alert("this note deleted")
    fetchrejected()
  }
    useEffect(() => {
     fetchrejected()
     }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📚 Rejected Notes
            {rejectedNotes.length > 0 && (
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">{rejectedNotes.length}</span>
            )}
          </h2>
          
          {rejectedNotes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No rejected notes at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rejectedNotes.map(note => (
                <div key={note._id} className="border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
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
                      <p className="text-sm text-gray-600 font-semibold">Submitted By</p>
                      <p className="text-gray-800">{note.uploadedBy}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <a 
                        href={note.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-center"
                      >
                        📥 Download
                      </a>
                      <button 
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                        onClick={() => { handledelete(note._id) }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold"
            onClick={()=>{navigate('/admin/Home')}}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminRejected
