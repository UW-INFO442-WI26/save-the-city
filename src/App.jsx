import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HostDash from './hostDash';
import UserDash from './userDash';
import Home from './home';
import AboutUs from './aboutUs';
import Navbar from './navbar';
import Footer from './footer';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/host" element={<HostDash />} />
        <Route path="/user" element={<UserDash />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      <Footer />


    </div>
    
  );
}

export default App;