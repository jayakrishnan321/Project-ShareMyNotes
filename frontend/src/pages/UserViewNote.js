import React, { useEffect, useState } from 'react';
import api from '../api';

function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    title: 'all',
    search: '',
  });

  // Build file URL using API host from environment instead of whatever host is in note.fileUrl
  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return '#';

    const base = process.env.REACT_APP_API_URL || '';

    try {
      // If fileUrl is an absolute URL (likely with localhost), keep only its path
      const url = new URL(fileUrl);
      return `${base.replace(/\/$/, '')}${url.pathname}`;
    } catch {
      // If fileUrl is already a relative path
      const path = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
      return `${base.replace(/\/$/, '')}${path}`;
    }
  };

  const fetchnotes = () => {
    api.get('/notes/public')
      .then((res) => setNotes(res.data))
      .catch(() => alert('Failed to load notes'));

  }

  useEffect(() => {
    fetchnotes()
  }, []);
  
  const filteredsubject = notes.filter((note) => {
    const matchTitle = filters.title === 'all' || note.title === filters.title;
    const matchSearch = note.subject.toLowerCase().includes(filters.search.toLowerCase());
    return matchTitle && matchSearch;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📚 Uploaded Notes
          </h2>
          
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-semibold mb-2">Filter by Semester</label>
              <select
                value={filters.title}
                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white"
              >
                <option value="all">All Semesters</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
                <option value="S7">S7</option>
                <option value="S8">S8</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-semibold mb-2">Search Subject</label>
              <input
                type="text"
                placeholder="Search subject..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                  <th className="p-4 text-left font-semibold">Semester</th>
                  <th className="p-4 text-left font-semibold">Subject</th>
                  <th className="p-4 text-center font-semibold">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredsubject.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">
                      No notes found
                    </td>
                  </tr>
                ) : (
                  filteredsubject.map((note, index) => (
                    <tr 
                      key={note._id} 
                      className={`border-b hover:bg-green-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-semibold text-gray-800">{note.title}</td>
                      <td className="p-4 text-gray-700">{note.subject}</td>
                      <td className="p-4 text-center">
                        <a
                          href={getFileUrl(note.fileUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                        >
                          📥 Download
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNotes;
