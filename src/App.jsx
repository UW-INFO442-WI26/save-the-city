import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './Auth';
import LoginScreen from './LoginScreen';
import HostDash from './hostDash';
import UserDash from './userDash';
import Home from './home';
import AboutUs from './aboutUs';
import Navbar from './Navbar';


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <LoginScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/host"
          element={
            <PrivateRoute>
              <HostDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDash />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;