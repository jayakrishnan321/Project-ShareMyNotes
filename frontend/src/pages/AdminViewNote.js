import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    title: 'all',
    search: '',
  });

  
 
  
 
  const fetchnotes = () => {
    axios.get('http://localhost:5000/api/notes/public')
      .then((res) => setNotes(res.data))
      .catch(() => alert('Failed to load notes'));

  }

  useEffect(() => {
    fetchnotes()
  }, []);
  const handledelete = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    alert("note deleted")
    fetchnotes()

  }
  const filteredsubject = notes.filter((note) => {
    const matchTitle = filters.title === 'all' || note.title === filters.title;
    const matchSearch = note.subject.toLowerCase().includes(filters.search.toLowerCase());
    return matchTitle && matchSearch;
  });
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Uploaded Notes</h2>
      <select
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        className="border px-3 py-1 rounded"
      >
        <option value="all">All</option>
        <option value="S1">S1</option>
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
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Semester</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Download</th>
           <th className="p-2 border">Delete</th>
              
           
            
          </tr>
        </thead>
        <tbody>
          {filteredsubject.map((note) => (
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
              </td>
             
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded ml-10"
                    onClick={() => handledelete(note._id)}
                  >
                    Delete
                  </button>
                </td>
             


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewNotes;
