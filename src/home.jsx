import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page page-content">
      <div className="container py-5">
        <section className="home-hero text-center mb-5">
          <h1 className="home-hero__title">Welcome to Save the City</h1>
          <p className="home-hero__lead">
            Find and support community gardens across Seattle. Get fresh produce, volunteer your time, and connect with your neighborhood—all in one place.
          </p>
        </section>

        <section className="home-how mb-5">
          <h2 className="home-section__heading">How it works</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="home-card p-4 h-100">
                <h3 className="home-card__title text-success">Garden hosts</h3>
                <p className="home-card__text">
                  List your community garden on our map, set volunteer and harvest times, and welcome neighbors who want to grow and share food with you.
                </p>
                <Link to="/host" className="btn btn-success">Host a garden</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="home-card p-4 h-100">
                <h3 className="home-card__title text-success">Volunteers & neighbors</h3>
                <p className="home-card__text">
                  Browse gardens near you, filter by what you care about, and sign up for volunteer shifts or harvest times. No experience needed.
                </p>
                <Link to="/user" className="btn btn-outline-success">Find gardens</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="home-why mb-5">
          <h2 className="home-section__heading">Why community gardens?</h2>
          <ul className="home-list">
            <li>Access to fresh, local produce—especially in areas where healthy food is hard to find</li>
            <li>Stronger neighborhoods through shared spaces and face-to-face connection</li>
            <li>Climate-friendly, sustainable food grown right in the city</li>
            <li>A simple way to give back: volunteer a few hours or join a harvest</li>
          </ul>
          <Link to="/about" className="btn btn-outline-success mt-3">Learn more about our mission</Link>
        </section>

        <section className="home-cta text-center py-4">
          <p className="home-cta__text mb-3">Ready to get started?</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/host" className="btn btn-success">I want to host a garden</Link>
            <Link to="/user" className="btn btn-success">I want to volunteer or harvest</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
