import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

export default function Navbar() {
  const { user, viewMode, toggleView, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/home');
  };

  const handleToggleView = () => {
    toggleView();
    navigate(viewMode === 'user' ? '/host' : '/user');
  };

  const displayName = user?.displayName || user?.email || 'User';
  const avatarLetter = displayName[0].toUpperCase();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100 py-3">
      <div className="container-fluid">

        <div className="navbar-brand-wrapper d-flex flex-column">
          <NavLink className="navbar-brand brand text-success bungee-regular p-0 me-0" to="/">
            Save the City
          </NavLink>
          <span className="navbar-tagline text-muted small">Seattle community gardens</span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link brand" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link brand" to="/about">About Us</NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link brand" to="/user">User Portal</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link brand" to="/host">Host Portal</NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28, fontSize: '0.75rem' }}>
                    {avatarLetter}
                  </span>
                  {displayName}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text small text-muted">{user.email}</span>
                  </li>
                  <li>
                    <span className="dropdown-item-text small text-success fw-bold">
                      {viewMode === 'user' ? '🌱 User View' : '🏡 Host View'}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleToggleView}>
                      ⇄ Switch to {viewMode === 'user' ? 'Host' : 'User'} View
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="btn btn-success btn-sm px-3" to="/login">Sign In</NavLink>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}