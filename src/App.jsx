import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ConsumerDash from './consumerDash';
import HostDash from './hostDash';
import VolunteerDash from './volunteerDash';
import Home from './home';
import Navbar from './navbar';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/consumer" element={<ConsumerDash />} />
        <Route path="/host" element={<HostDash />} />
        <Route path="/volunteer" element={<VolunteerDash />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

    </div>
    
  );
}

export default App;