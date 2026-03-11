import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-us page-content" role="region" aria-label="About Save the City">
      <div className="container">

        <section className="home-section">
          <h1 className="about-us__title">About Us</h1>
          <p className="about-us__lead text-dark">
            We're on a mission to <span className="text-success fw-semibold">Save the City</span>—one community garden at a time.
          </p>
        </section>

        <section className="home-section--alt">
          <h2 className="home-section__heading">What we're about</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="home-card p-4 h-100 d-flex flex-column">
                <h3 className="home-card__title text-success">Our Mission</h3>
                <p className="about-us__body text-dark">
                  Save the City connects Seattle residents with local community gardens so everyone can access fresh produce, get involved in sustainable food systems, and build stronger neighborhoods. We believe that when people grow and share food together, cities become healthier, fairer, and more resilient.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="home-card p-4 h-100 d-flex flex-column">
                <h3 className="home-card__title text-success">The Problem We're Solving</h3>
                <p className="about-us__body text-dark">
                  Many people in cities live in <strong>food deserts</strong>—areas where affordable, healthy food is hard to find. At the same time, lots of people want to get involved in local, sustainable food but don't know where to start. Others have time or resources to give back but lack a simple way to do it. We're tackling food insecurity, unequal access to fresh produce, and the need for more community-driven food spaces—all in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h2 className="home-section__heading">See community gardens in action</h2>
              <p className="home-hero__lead">
                Watch neighbors plant, tend, and care for gardens together—building community one harvest at a time.
              </p>
            </div>
            <div className="col-md-6">
              <div className="home-card overflow-hidden p-0" style={{ borderRadius: 12, boxShadow: 'none' }}>
                <video
                  controls
                  width="100%"
                  style={{ display: 'block', borderRadius: 12 }}
                  title="People helping in a community garden"
                  aria-label="Video showing volunteers planting, tending, and caring for plants together in a community garden"
                >
                  <source src="https://assets.mixkit.co/videos/6763/6763-720.mp4" type="video/mp4" />
                  <p>Your browser does not support video. <a href="https://assets.mixkit.co/videos/6763/6763-720.mp4">Download the video</a> instead.</p>
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section--alt">
          <h2 className="home-section__heading">How We Do It</h2>
          <p className="about-us__body text-dark mb-3">
            Our platform supports <span className="text-success fw-semibold">UN Sustainable Development Goal 11: Sustainable Cities and Communities</span>. 
            We help garden hosts list their spaces, post volunteer and harvest times, and reach neighbors who want to participate. Volunteers and community 
            members can find gardens on a map, filter by what matters to them, and sign up for shifts—making it easy to grow, share, and eat local.
          </p>
        </section>

        <section
          className="home-cta py-4 rounded-3 px-4 mb-4 mt-5 d-flex flex-wrap align-items-center justify-content-between gap-3"
          style={{ background: '#1f4a2e' }}
        >
          <div>
            <p className="mb-1 text-white fw-semibold" style={{ fontSize: '1.25rem' }}>Get Involved</p>
            <p className="mb-0 text-white" style={{ opacity: 0.85, fontSize: '1rem' }}>
              Whether you run a community garden or want to volunteer and harvest, you're in the right place.
            </p>
          </div>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/host" className="btn btn-lg btn-white-outline" aria-label="Go to Host Portal to register a garden">Host a garden</Link>
            <Link to="/user" className="btn btn-success btn-lg" aria-label="Go to User Portal to find gardens and volunteer">Find gardens & volunteer</Link>
          </div>
        </section>

      </div>
    </div>
  );
}
