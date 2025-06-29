import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/AdminDashboard';
import UploadNote from './pages/UploadNote';
import ViewNotes from './pages/ViewNotes';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import UserDashboard from './pages/UserDashboard';
import AdminReview from './pages/AdminReview';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin/Home' element={<Home />} />
        <Route path="/admin/upload" element={<UploadNote />} />
        <Route path="/admin/view" element={<ViewNotes />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/review" element={<AdminReview />} />
      </Routes>
    </Router>
  );
}

export default App;
