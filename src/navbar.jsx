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
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100 py-3" style={{ background: 'rgba(31, 74, 46, 0.72)', backdropFilter: 'blur(4px)' }}>
      <div className="container-fluid">

        <div className="navbar-brand-wrapper d-flex flex-column">
          <NavLink className="navbar-brand brand text-white bungee-regular fs-4 fw-bold" to="/">
            Save the City
          </NavLink>
          <span className="navbar-tagline small" style={{ color: 'rgb(255, 255, 255)' }}>
            Seattle community gardens
          </span>
        </div>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-semibold" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-semibold" to="/about">About Us</NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white fw-semibold" to="/user">User Portal</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white fw-semibold" to="/host">Host Portal</NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-1 align-items-center">
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center gap-2 text-white fw-semibold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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