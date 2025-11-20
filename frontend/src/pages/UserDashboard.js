
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
  const email=decoded.email
const handleupload=()=>{
  sessionStorage.setItem('email',email)
  navigate('/user/upload')
}
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            📚 Hello, {email}!
          </h1>
          <p className="text-gray-600 text-lg">Welcome to your dashboard</p>
        </div>

        {/* Row 1: Upload & View */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Upload */}
          <div
            onClick={handleupload}
            className="w-64 h-48 cursor-pointer bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-2xl font-bold"
          >
            <span className="text-5xl mb-3">➕</span>
            <span>Upload Note</span>
          </div>

          {/* View Notes */}
          <div
            onClick={() => navigate('/user/view')}
            className="w-64 h-48 cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-2xl font-bold"
          >
            <span className="text-5xl mb-3">📄</span>
            <span>View Notes</span>
          </div>
        </div>

        {/* Row 2: Logout centered below */}
        <div className="flex justify-center">
          <div
            onClick={handleLogout}
            className="w-64 h-48 cursor-pointer bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-2xl font-bold"
          >
            <span className="text-5xl mb-3">🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
