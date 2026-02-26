import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, push } from 'firebase/database';

export default function ThreeColumn({ selectedGarden, eventType }) {
  const [gardens, setGardens] = useState([]);
  const [registerSlot, setRegisterSlot] = useState(null);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerSaving, setRegisterSaving] = useState(false);

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

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!registerSlot || !selectedGarden?.firebaseId || !registerEmail.trim()) return;
    setRegisterSaving(true);
    try {
      const path = `gardens/${selectedGarden.firebaseId}/${registerSlot.kind}Times/${registerSlot.slotId}/registrations`;
      await push(ref(database, path), { email: registerEmail.trim() });
      setRegisterSlot(null);
      setRegisterEmail('');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert('Registration failed. Please try again.');
    } finally {
      setRegisterSaving(false);
    }
  }

  function spotsLeft(slot) {
    const total = slot.spots || 0;
    const registered = slot.registrations ? Object.keys(slot.registrations).length : 0;
    return Math.max(0, total - registered);
  }

  return (
    <div className="three-column-layout">

      <div className="column column-light">
        <p className="column-header">Community Garden Info</p>
        <div className="column-body">
          <p className="column-body__intro">
            Click a garden on the map to see details here: address, host contact, produce types, and description.
          </p>

           {!selectedGarden && (
            <div className="user-portal-card user-portal-card--empty">
              No garden selected. Use the map to find a community garden.
            </div>
          )}

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

      {/* ── Register for Harvest Time ── */}
      <div className="column column-light">
        <p className="column-header">
          Register for Harvest Time
          {eventType === 'harvest' && (
            <span className="badge bg-success ms-2">Filter active</span>
          )}
        </p>
        <div className="column-body">
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
            Object.entries(selectedGarden.harvestTimes).map(([id, slot]) => {
              const left = spotsLeft(slot);
              return (
                <div key={id} className="user-portal-card">
                  <div className="user-portal-card__title">
                    {slot.date} · {slot.start} – {slot.end}
                  </div>
                  <div className="user-portal-card__meta">
                    {selectedGarden.name}
                    {typeof slot.spots === 'number' && ` · ${left} spots left`}
                  </div>
                  <button
                    type="button"
                    className="btn btn-success btn-sm mt-2"
                    disabled={typeof slot.spots === 'number' && left <= 0}
                    onClick={() => setRegisterSlot({ slotId: id, kind: 'harvest' })}
                  >
                    Register
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Register for Volunteer Time ── */}
      <div className="column column-light">
        <p className="column-header">
          Register for Volunteer Time
          {eventType === 'volunteer' && (
            <span className="badge bg-success ms-2">Filter active</span>
          )}
        </p>
        <div className="column-body">
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
            Object.entries(selectedGarden.volunteerTimes).map(([id, slot]) => {
              const left = spotsLeft(slot);
              return (
                <div key={id} className="user-portal-card">
                  <div className="user-portal-card__title">
                    {slot.date} · {slot.start} – {slot.end}
                  </div>
                  <div className="user-portal-card__meta">
                    {selectedGarden.name}
                    {typeof slot.spots === 'number' && ` · ${left} spots left`}
                  </div>
                  <button
                    type="button"
                    className="btn btn-success btn-sm mt-2"
                    disabled={typeof slot.spots === 'number' && left <= 0}
                    onClick={() => setRegisterSlot({ slotId: id, kind: 'volunteer' })}
                  >
                    Register
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {registerSlot && selectedGarden && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register for this slot</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => { setRegisterSlot(null); setRegisterEmail(''); }}
                />
              </div>
              <form onSubmit={handleRegisterSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Your email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => { setRegisterSlot(null); setRegisterEmail(''); }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success" disabled={registerSaving}>
                    {registerSaving ? 'Saving…' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
