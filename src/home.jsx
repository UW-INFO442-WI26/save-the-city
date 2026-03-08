import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import garden1 from './assets/sample-garden1.jpg';
import garden2 from './assets/sample-garden2.png';
import garden3 from './assets/sample-garden3.png';
import { useAuth } from './Auth';

const gardenSlides = [garden1, garden2, garden3];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const { user, role, setOpenAccountMenu } = useAuth();

  const prevSlide = () => {
    setSlideIndex(i => (i === 0 ? gardenSlides.length - 1 : i - 1));
  };

  const nextSlide = () => {
    setSlideIndex(i => (i === gardenSlides.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page page-content" role="region" aria-label="Welcome and how it works">
      <div className="container">

        <section className="home-section">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h1 className="home-hero__title">Welcome to Save the City</h1>
              <p className="home-hero__lead">
                Find and support community gardens across Seattle. Get fresh produce, volunteer your time, and connect with your neighborhood—all in one place.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {role === 'host' ? (
                  <button className="btn btn-success btn-lg" onClick={() => setOpenAccountMenu(true)}>
                    Find gardens
                  </button>
                ) : (
                  <Link to="/user" className="btn btn-success btn-lg">Find gardens</Link>
                )}
                {role === 'volunteer' ? (
                  <button className="btn btn-outline-success btn-lg" onClick={() => setOpenAccountMenu(true)}>
                    Host a garden
                  </button>
                ) : (
                  <Link to="/host" className="btn btn-outline-success btn-lg">Host a garden</Link>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="home-card overflow-hidden p-0" style={{ borderRadius: 12, boxShadow: 'none' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', background: '#dfeee6' }}>
                  <img
                    src={gardenSlides[slideIndex]}
                    alt={`Community garden image ${slideIndex + 1} of ${gardenSlides.length}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.4s ease' }}
                  />
                  <button type="button" className="slide-arrow slide-arrow--left" onClick={prevSlide} aria-label="Previous image">&#8249;</button>
                  <button type="button" className="slide-arrow slide-arrow--right" onClick={nextSlide} aria-label="Next image">&#8250;</button>
                  <div role="tablist" aria-label="Image carousel dots" style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
                    {gardenSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlideIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        aria-current={i === slideIndex ? 'true' : undefined}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: i === slideIndex ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'background 0.2s', border: 'none', padding: 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section--alt">
          <h2 className="home-section__heading">How it works</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="home-card p-4 h-100 d-flex flex-column">
                <h3 className="home-card__title text-success">Garden hosts</h3>
                <p className="home-card__text flex-grow-1">
                  List your community garden on our map, set volunteer and harvest times, and welcome neighbors who want to grow and share food with you.
                </p>
                {role === 'volunteer' ? (
                  <button className="btn btn-outline-success btn-lg" onClick={() => setOpenAccountMenu(true)}>
                    Host a garden
                  </button>
                ) : (
                  <Link to="/host" className="btn btn-outline-success btn-lg">Host a garden</Link>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="home-card p-4 h-100 d-flex flex-column">
                <h3 className="home-card__title text-success">Volunteers & neighbors</h3>
                <p className="home-card__text flex-grow-1">
                  Browse gardens near you, filter by what you care about, and sign up for volunteer shifts or harvest times. No experience needed.
                </p>
                {role === 'host' ? (
                  <button className="btn btn-success btn-lg" onClick={() => setOpenAccountMenu(true)}>
                    Find gardens
                  </button>
                ) : (
                  <Link to="/user" className="btn btn-success btn-lg">Find gardens</Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section__heading">Why community gardens?</h2>
          <ul className="home-list">
            <li>Access to fresh, local produce—especially in areas where healthy food is hard to find</li>
            <li>Stronger neighborhoods through shared spaces and face-to-face connection</li>
            <li>Climate-friendly, sustainable food grown right in the city</li>
            <li>A simple way to give back: volunteer a few hours or join a harvest</li>
          </ul>
          <Link to="/about" className="btn btn-outline-success btn-lg mt-1.5" aria-label="Learn more about our mission on the About page">Learn more about our mission</Link>
        </section>

        <section
          className="home-cta py-4 rounded-3 px-4 mb-5 d-flex flex-wrap align-items-center justify-content-between gap-3"
          style={{ background: '#1f4a2e' }}
        >
          <div>
            <p className="home-cta__text mb-1 text-white fw-semibold" style={{ opacity: 100, fontSize: '1.25rem' }}>Ready to get started?</p>
            <p className="mb-0 text-white" style={{ opacity: 0.85, fontSize: '1rem' }}>Pick a path and we'll take you there.</p>
          </div>
          <div className="d-flex flex-wrap gap-3">
            {role === 'volunteer' ? (
              <button className="btn btn-outline-success btn-lg" onClick={() => setOpenAccountMenu(true)}>
                Host a garden
              </button>
            ) : (
              <Link to="/host" className="btn btn-outline-success btn-lg">Host a garden</Link>
            )}
            {role === 'host' ? (
                <button className="btn btn-success btn-lg" onClick={() => setOpenAccountMenu(true)}>
                  Find gardens
                </button>
              ) : (
                <Link to="/user" className="btn btn-success btn-lg">Find gardens</Link>
              )}
          </div>
        </section>

      </div>
    </div>
  );
}