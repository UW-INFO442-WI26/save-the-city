import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HostDash from './hostDash';
import UserDash from './userDash';
import Home from './home';
import Navbar from './navbar';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/host" element={<HostDash />} />
        <Route path="/user" element={<UserDash />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

    </div>
    
  );
}

export default App;