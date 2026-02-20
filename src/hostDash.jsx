import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HostLocationPicker from './hostLocationPicker';

export default function HostDash() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="host-page page-content">
      <div className="container py-4">
        <section className="host-hero mb-5">
          <h1 className="host-hero__title">Host Dashboard</h1>
          <p className="host-hero__lead">
            Create and manage your community garden, set volunteer and harvest times, and see how your listing looks to volunteers.
          </p>
        </section>

        <section className="host-section mb-5">
          <h2 className="host-section__heading">Create new garden</h2>
          <p className="host-section__intro">
            Add your garden to the map so volunteers and neighbors can find it. You’ll pick a location, then enter the name, address, description, and tags.
          </p>
          <button className="btn btn-success" onClick={() => setShowMap(true)}>
            Register a new garden
          </button>
        </section>

        <section className="host-section mb-5">
          <h2 className="host-section__heading">My gardens</h2>
          <p className="host-section__intro">
            Gardens you’ve registered appear here. Click one to edit details, add volunteer or harvest times, or delete it.
          </p>
          <div className="host-card host-card--empty">
            No gardens yet. Register a garden above to get started.
          </div>
          <div className="host-card">
            <div className="host-card__title">Example: Sunrise Community Garden</div>
            <div className="host-card__meta">123 Green St, Seattle · Vegetables, Herbs</div>
            <div className="host-card__actions mt-2">
              <button type="button" className="btn btn-outline-success btn-sm me-2">Edit</button>
              <button type="button" className="btn btn-outline-secondary btn-sm">Manage times</button>
            </div>
          </div>
        </section>

        <section className="host-section mb-5">
          <h2 className="host-section__heading">Volunteer times</h2>
          <p className="host-section__intro">
            Add work sessions when you need help. Volunteers can sign up from the User Portal. Set the date, time range, and max participants.
          </p>
          <button type="button" className="btn btn-outline-success btn-sm mb-3">Add new volunteer time</button>
          <div className="host-card host-card--empty">
            No volunteer times yet. Add one above or select a garden first.
          </div>
          <div className="host-card">
            <div className="host-card__title">Sun, Mar 10 · 10:00 AM – 2:00 PM</div>
            <div className="host-card__meta">Sunrise Community Garden · 5 spots · 2 registered</div>
          </div>
        </section>

        <section className="host-section mb-5">
          <h2 className="host-section__heading">Harvest times</h2>
          <p className="host-section__intro">
            Post harvest slots so community members can sign up to help pick or receive produce. Set the date, time range, and max harvesters.
          </p>
          <button type="button" className="btn btn-outline-success btn-sm mb-3">Add new harvest time</button>
          <div className="host-card host-card--empty">
            No harvest times yet. Add one above or select a garden first.
          </div>
          <div className="host-card">
            <div className="host-card__title">Sat, Mar 8 · 9:00 AM – 12:00 PM</div>
            <div className="host-card__meta">Sunrise Community Garden · 3 spots · 1 registered</div>
          </div>
        </section>

        <section className="host-section mb-5">
          <h2 className="host-section__heading">View as volunteer</h2>
          <p className="host-section__intro">
            See how your garden and times look to volunteers and neighbors on the map.
          </p>
          <Link to="/user" className="btn btn-outline-success">Open User Portal (volunteer view)</Link>
        </section>

        <section className="host-section host-section--danger mb-5">
          <h2 className="host-section__heading">Delete garden</h2>
          <p className="host-section__intro">
            Permanently remove a garden and all its volunteer and harvest times. You’ll be asked to enter your password to confirm.
          </p>
          <button type="button" className="btn btn-outline-danger" disabled>Delete garden (select a garden first)</button>
        </section>
      </div>

      {showMap && (
        <div className="map-overlay">
          <HostLocationPicker
            onConfirm={(location) => {
              console.log('Location confirmed:', location);
              setShowMap(false);
            }}
            onCancel={() => setShowMap(false)}
          />
        </div>
      )}
    </div>
  );
}
