import React from 'react';

export default function ThreeColumn() {
  return (
    <div className="three-column-layout">
      <div className="column column-light">
        <p className="column-header">Community Garden Info</p>
        <div className="column-body">
          <p className="column-body__intro">
            Click a garden on the map to see details here: address, host contact, produce types, and description.
          </p>
          <div className="user-portal-card user-portal-card--empty">
            No garden selected. Use the map or filters above to find a community garden.
          </div>
          <div className="user-portal-card">
            <div className="user-portal-card__title">Example: Sunrise Community Garden</div>
            <div className="user-portal-card__meta">123 Green St, Seattle · Vegetables, Herbs</div>
            <p className="mb-0 mt-2 small text-secondary">Sample listing. Real gardens will show address, owner, produce types, and a link to Google Maps.</p>
          </div>
        </div>
      </div>
      <div className="column column-light">
        <p className="column-header">Register for Harvest Time</p>
        <div className="column-body">
          <p className="column-body__intro">
            Harvest times let you sign up to help pick or receive produce. Click a card to register.
          </p>
          <div className="user-portal-card user-portal-card--empty">
            No harvest times posted yet. Check back or select a garden above.
          </div>
          <div className="user-portal-card">
            <div className="user-portal-card__title">Sat, Mar 8 · 9:00 AM – 12:00 PM</div>
            <div className="user-portal-card__meta">Sunrise Community Garden · 3 spots left</div>
            <button type="button" className="btn btn-success btn-sm mt-2">Register</button>
          </div>
        </div>
      </div>
      <div className="column column-light">
        <p className="column-header">Register for Volunteer Time</p>
        <div className="column-body">
          <p className="column-body__intro">
            Volunteer times are work sessions at the garden. Choose a slot and register to join.
          </p>
          <div className="user-portal-card user-portal-card--empty">
            No volunteer times posted yet. Check back or select a garden above.
          </div>
          <div className="user-portal-card">
            <div className="user-portal-card__title">Sun, Mar 10 · 10:00 AM – 2:00 PM</div>
            <div className="user-portal-card__meta">Sunrise Community Garden · 5 spots left</div>
            <button type="button" className="btn btn-success btn-sm mt-2">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
