
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
 <div className="p-6 max-w-3xl mx-auto">
  <h1 className="text-3xl font-bold mb-10 text-center text-blue-800">
    📚 Hello {email}
  </h1>

  {/* Row 1: Upload & View */}
  <div className="flex justify-center gap-10 mb-10">
    {/* Upload */}
    <div
      onClick={handleupload}
      className="w-48 h-32 cursor-pointer border border-green-600 text-green-700 hover:bg-green-100 transition rounded-lg shadow flex items-center justify-center text-xl font-semibold"
    >
      ➕ Upload Note
    </div>

    {/* View Notes */}
    <div
      onClick={() => navigate('/user/view')}
      className="w-48 h-32 cursor-pointer border border-blue-600 text-blue-700 hover:bg-blue-100 transition rounded-lg shadow flex items-center justify-center text-xl font-semibold"
    >
      📄 View Notes
    </div>
  </div>

  {/* Row 2: Logout centered below */}
  <div className="flex justify-center">
    <div
      onClick={handleLogout}
      className="w-48 h-32 cursor-pointer border border-red-600 text-red-700 hover:bg-red-100 transition rounded-lg shadow flex items-center justify-center text-xl font-semibold"
    >
      Logout
    </div>
  </div>
</div>


  );
}

export default UserDashboard;
