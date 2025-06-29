import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/AdminDashboard';
import UploadNote from './pages/UploadNote';
import ViewNotes from './pages/ViewNotes';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin/Home' element={<Home/>}/>
        <Route path="/admin/upload" element={<UploadNote />} />
         <Route path="/admin/view" element={<ViewNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
