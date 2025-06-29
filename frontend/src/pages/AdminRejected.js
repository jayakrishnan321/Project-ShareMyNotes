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
    <div>
        <h2 className="text-xl font-semibold my-4">📚 Rejected Notes</h2>
      {rejectedNotes.length === 0 ? (
        <p>No Rejected notes.</p>
      ) : (
        rejectedNotes.map(note => (
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
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={()=>{navigate('/admin/Home')}}>back to home</button>
    </div>
  )
}

export default AdminRejected
