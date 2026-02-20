import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100 py-3">
      <div className="container-fluid">
           <div className="navbar-brand-wrapper d-flex flex-column">
          <NavLink className="navbar-brand brand text-success bungee-regular p-0 me-0" to="/">Save the City</NavLink>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link brand" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link brand" to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link brand" to="/user">User Portal</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link brand" to="/host">Host Portal</NavLink>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
