import React from 'react';

export default function Accordian() {
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Community Garden Info
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body accordion-body-padded">
            <p className="column-body__intro">
              Click a garden on the map to see details here: address, host contact, produce types, and description.
            </p>
            <div className="user-portal-card user-portal-card--empty">
              No garden selected. Use the map or filters above to find a community garden.
            </div>
            <div className="user-portal-card">
              <div className="user-portal-card__title">Example: Sunrise Community Garden</div>
              <div className="user-portal-card__meta">123 Green St, Seattle · Vegetables, Herbs</div>
              <p className="mb-0 mt-2 small text-secondary">Sample listing. Real gardens will show address, owner, and a link to Google Maps.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingTwo">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Register for Harvest Time
          </button>
        </h2>
        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body accordion-body-padded">
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
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Register for Volunteer Time
          </button>
        </h2>
        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body accordion-body-padded">
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
    </div>
  );
}
