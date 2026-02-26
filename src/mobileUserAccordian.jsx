import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';

export default function Accordian({ selectedGarden }) {
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    const gardensRef = ref(database, 'gardens');
    const unsubscribe = onValue(gardensRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGardens(Object.values(data));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">

      {/* ── Community Garden Info ── */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Community Garden Info
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body accordion-body-padded">
            <p className="column-body__intro">
              Click a marker on the map to see garden details here.
            </p>

            {/* No garden selected yet */}
            {!selectedGarden && (
              <div className="user-portal-card user-portal-card--empty">
                No garden selected. Tap a pin on the map to get started.
              </div>
            )}

            {/* Selected garden card */}
            {selectedGarden && (
              <div className="user-portal-card user-portal-card--selected">
                <div className="user-portal-card__title">{selectedGarden.name}</div>
                <div className="user-portal-card__meta">
                  {selectedGarden.address} · {selectedGarden.tags?.join(', ')}
                </div>
                <div className="mt-2 small text-secondary">
                  {selectedGarden.description && (
                    <p className="mb-1">{selectedGarden.description}</p>
                  )}
                  {selectedGarden.email && (
                    <p className="mb-1">📧 {selectedGarden.email}</p>
                  )}
                  {selectedGarden.phone && (
                    <p className="mb-1">📞 {selectedGarden.phone}</p>
                  )}
                  {selectedGarden.socialLinks?.length > 0 && (
                    <div>
                      {selectedGarden.socialLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="d-block"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* All gardens list */}
            {gardens.length === 0 ? (
              <div className="user-portal-card user-portal-card--empty">
                No gardens registered yet.
              </div>
            ) : (
              gardens.map((garden, index) => (
                <div
                  key={index}
                  className={`user-portal-card ${selectedGarden?.name === garden.name ? 'user-portal-card--selected' : ''}`}
                >
                  <div className="user-portal-card__title">{garden.name}</div>
                  <div className="user-portal-card__meta">
                    {garden.address} · {garden.tags?.join(', ')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Register for Harvest Time ── */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            Register for Harvest Time
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body accordion-body-padded">
            <p className="column-body__intro">
              Harvest times let you sign up to help pick or receive produce. Click a card to register.
            </p>

            {!selectedGarden && (
              <div className="user-portal-card user-portal-card--empty">
                No garden selected. Choose a garden above to see harvest times.
              </div>
            )}

            {selectedGarden && !selectedGarden.harvestTimes && (
              <div className="user-portal-card user-portal-card--empty">
                No harvest times posted yet for this garden.
              </div>
            )}

            {selectedGarden && selectedGarden.harvestTimes && (
              Object.entries(selectedGarden.harvestTimes).map(([id, slot]) => (
                <div key={id} className="user-portal-card">
                  <div className="user-portal-card__title">
                    {slot.date} · {slot.start} – {slot.end}
                  </div>
                  <div className="user-portal-card__meta">
                    {selectedGarden.name}{slot.spots ? ` · ${slot.spots} spots left` : ''}
                  </div>
                  <button type="button" className="btn btn-success btn-sm mt-2">
                    Register
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Register for Volunteer Time ── */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            Register for Volunteer Time
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body accordion-body-padded">
            <p className="column-body__intro">
              Volunteer times are work sessions at the garden. Choose a slot and register to join.
            </p>

            {!selectedGarden && (
              <div className="user-portal-card user-portal-card--empty">
                No garden selected. Choose a garden above to see volunteer times.
              </div>
            )}

            {selectedGarden && !selectedGarden.volunteerTimes && (
              <div className="user-portal-card user-portal-card--empty">
                No volunteer times posted yet for this garden.
              </div>
            )}

            {selectedGarden && selectedGarden.volunteerTimes && (
              Object.entries(selectedGarden.volunteerTimes).map(([id, slot]) => (
                <div key={id} className="user-portal-card">
                  <div className="user-portal-card__title">
                    {slot.date} · {slot.start} – {slot.end}
                  </div>
                  <div className="user-portal-card__meta">
                    {selectedGarden.name}{slot.spots ? ` · ${slot.spots} spots left` : ''}
                  </div>
                  <button type="button" className="btn btn-success btn-sm mt-2">
                    Register
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}