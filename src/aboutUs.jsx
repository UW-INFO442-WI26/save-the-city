import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-us page-content">
      <div className="container py-5">
        <h1 className="about-us__title mb-4">About Us</h1>
        <p className="about-us__lead text-dark">
          We’re on a mission to <span className="text-success fw-semibold">Save the City</span>—one community garden at a time.
        </p>

        <section className="about-us__section mt-5">
          <h2 className="about-us__heading text-dark">Our Mission</h2>
          <p className="about-us__body text-dark">
            Save the City connects Seattle residents with local community gardens so everyone can access fresh produce, get involved in sustainable food systems, and build stronger neighborhoods. We believe that when people grow and share food together, cities become healthier, fairer, and more resilient.
          </p>
        </section>

        <section className="about-us__section mt-4">
          <h2 className="about-us__heading text-dark">The Problem We’re Solving</h2>
          <p className="about-us__body text-dark">
            Many people in cities live in <strong>food deserts</strong>—areas where affordable, healthy food is hard to find. At the same time, lots of people want to get involved in local, sustainable food but don’t know where to start. Others have time or resources to give back but lack a simple way to do it. We’re tackling food insecurity, unequal access to fresh produce, and the need for more community-driven food spaces—all in one place.
          </p>
        </section>

        <section className="about-us__section mt-4">
          <h2 className="about-us__heading text-dark">How We Do It</h2>
          <p className="about-us__body text-dark">
            Our platform supports <span className="text-success fw-semibold">UN Sustainable Development Goal 11: Sustainable Cities and Communities</span>. We help garden hosts list their spaces, post volunteer and harvest times, and reach neighbors who want to participate. Volunteers and community members can find gardens on a map, filter by what matters to them, and sign up for shifts—making it easy to grow, share, and eat local.
          </p>
        </section>

        <section className="about-us__section mt-4">
          <h2 className="about-us__heading text-dark">Get Involved</h2>
          <p className="about-us__body text-dark mb-4">
            Whether you run a community garden or want to volunteer and harvest, you’re in the right place. Join us and help Save the City.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/host" className="btn btn-success">Host a garden</Link>
            <Link to="/user" className="btn btn-outline-success">Find gardens & volunteer</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
