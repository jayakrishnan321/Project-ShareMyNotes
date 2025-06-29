import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewNotes() {
  const [notes, setNotes] = useState([]);

  const fetchnotes=()=>{
     axios.get('http://localhost:5000/api/notes')
      .then((res) => setNotes(res.data))
      .catch(() => alert('Failed to load notes'));

  }
   
      useEffect(() => {
        fetchnotes()
  }, []);
const handledelete=(id)=>{
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    alert("note deleted")
    fetchnotes()
    
}
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Uploaded Notes</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Download</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id} className="text-center">
              <td className="p-2 border">{note.title}</td>
              <td className="p-2 border">{note.subject}</td>
              <td className="p-2 border">
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download
                </a>
                <button onClick={()=>handledelete(note._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewNotes;
