
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate=useNavigate()
 
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/user/login'); // or your login route
  };

  

  

  return (
    <div className="p-6 max-w-3xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">📚 User Dashboard</h1>

  <div className="flex justify-center gap-4 mb-6">
    <button
      onClick={() => navigate('/user/upload')}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
    >
      ➕ Upload Note
    </button>
    <button
      onClick={() => navigate('/admin/view')}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
    >
      📄 View Notes
    </button>
     <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
  </div>

  
  <ul className="space-y-4">
    
  </ul>
</div>

  );
}

export default UserDashboard;
