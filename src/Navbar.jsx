import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

export default function Navbar() {
  const { user, role, saveRole, logout, openAccountMenu, setOpenAccountMenu } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Open dropdown when triggered from another component
  useEffect(() => {
    if (openAccountMenu) {
      setDropdownOpen(true);
      setOpenAccountMenu(false);
    }
  }, [openAccountMenu]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.closest('.dropdown').contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/home');
  };

  const handleToggleView = async () => {
    const newRole = role === 'volunteer' ? 'host' : 'volunteer';
    await saveRole(newRole);
    setDropdownOpen(false);
    navigate(newRole === 'host' ? '/host' : '/user');
  };

  const displayName = user?.displayName || user?.email || 'User';
  const avatarLetter = displayName?.[0]?.toUpperCase() ?? '?';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100 py-3 bg-success bg-opacity-75">
      <div className="container-fluid">

        <div className="d-flex flex-column">
          <NavLink className="navbar-brand text-white bungee-regular fs-4 fw-bold mb-0" to="/">
            Save the City
          </NavLink>
          <span className="small text-white">Seattle community gardens</span>
        </div>

        <button
          className="navbar-toggler border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
            {user && role === 'volunteer' && (
              <li className="nav-item">
                <NavLink className="nav-link text-white fw-semibold" to="/user">User Portal</NavLink>
              </li>
            )}
            {user && role === 'host' && (
              <li className="nav-item">
                <NavLink className="nav-link text-white fw-semibold" to="/host">Host Portal</NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-2 align-items-center">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  ref={dropdownRef}
                  className="nav-link d-flex align-items-center gap-2 text-white fw-semibold"
                  href="#"
                  onClick={(e) => { e.preventDefault(); setDropdownOpen((prev) => !prev); }}
                >
                  <span
                    className="rounded-circle bg-white text-success d-flex align-items-center justify-content-center fw-bold fs-6"
                    style={{ width: 32, height: 32 }}
                  >
                    {avatarLetter}
                  </span>
                  {displayName}
                </a>

                <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}>
                  <li>
                    <span className="dropdown-item-text small text-muted">{user.email}</span>
                  </li>
                  <li>
                    <span className="dropdown-item-text small text-success fw-bold">
                      {role === 'volunteer' ? '🌱 Volunteer View' : '🏡 Host View'}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleToggleView}>
                      ⇄ Switch to {role === 'volunteer' ? 'Host' : 'Volunteer'} View
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
                <NavLink className="btn btn-light btn-sm px-3 text-success fw-semibold" to="/login">
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}