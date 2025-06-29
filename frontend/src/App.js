import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/admin/Home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
