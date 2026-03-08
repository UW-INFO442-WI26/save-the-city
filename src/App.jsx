import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './Auth';
import LoginScreen from './LoginScreen';
import HostDash from './hostDash';
import UserDash from './userDash';
import Home from './home';
import AboutUs from './aboutUs';
import Navbar from './Navbar';
import RoleSelector from './Roleselector';

function PrivateRoute({ children, requiredRole }) {
  const { user, role, roleLoading } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleLoading) {
    return null;
  }

  if (!role) {
    return <RoleSelector />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'host' ? '/host' : '/user'} replace />;
  }

  return children;
}

function AppRoutes() {
  const { user, role } = useAuth();

  function getDefaultRoute() {
    if (!user) return '/home';
    if (!role) return '/home';
    return role === 'host' ? '/host' : '/user';
  }

  return (
    <div>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" role="main">
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to={getDefaultRoute()} replace /> : <LoginScreen />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/host"
          element={
            <PrivateRoute requiredRole="host">
              <HostDash />
            </PrivateRoute>
          }
        />
        <Route path="/user" element={<UserDash />} />
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}