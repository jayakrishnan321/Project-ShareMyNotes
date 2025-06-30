
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate=useNavigate()
 
    const handleLogout = () => {
    sessionStorage.clear()
    navigate('/user/login'); // or your login route
  };
const token=sessionStorage.getItem('token')
const decoded = JSON.parse(atob(token.split('.')[1]));
console.log(decoded.email); // should show the email
  

  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h3>{decoded.email}</h3>
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">📚 User Dashboard</h1>

  <div className="flex justify-center gap-4 mb-6">
    <button
      onClick={() => navigate('/user/upload')}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
    >
      ➕ Upload Note
    </button>
    <button
      onClick={() => navigate('/user/view')}
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
