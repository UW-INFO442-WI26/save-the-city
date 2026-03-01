import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, push } from 'firebase/database';

export default function ThreeColumn({ selectedGarden, onClose, eventType }) {
  const [gardens, setGardens] = useState([]);
  const [registerSlot, setRegisterSlot] = useState(null);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerSaving, setRegisterSaving] = useState(false);

  useEffect(() => {
    const gardensRef = ref(database, 'gardens');
    const unsubscribe = onValue(gardensRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setGardens(Object.values(data));
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

  // Don't render anything if no garden is selected
  if (!selectedGarden) return null;

  return (
    <>
      {/* Dark overlay — click it to close */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 999,
        }}
      />

      {/* Modal panel */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        zIndex: 1000,
        width: '90%',
        maxWidth: 820,
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '28px 32px',
      }}>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 16,
            background: 'none', border: 'none',
            fontSize: 22, cursor: 'pointer', color: '#555',
          }}
        >×</button>

        {/* Garden name header */}
        <h4 style={{ marginTop: 0, marginBottom: 4 }}>{selectedGarden.name}</h4>
        <p style={{ color: '#666', marginBottom: 20 }}>
          {selectedGarden.address} · {selectedGarden.tags?.join(', ')}
        </p>

        {/* Info + description */}
        <div style={{ marginBottom: 20 }}>
          {selectedGarden.description && <p>{selectedGarden.description}</p>}
          {selectedGarden.email && <p>📧 {selectedGarden.email}</p>}
          {selectedGarden.phone && <p>📞 {selectedGarden.phone}</p>}
          {selectedGarden.socialLinks?.length > 0 && selectedGarden.socialLinks.map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noreferrer" style={{ display: 'block' }}>{link}</a>
          ))}
        </div>

        <hr />

        {/* Two columns: Harvest + Volunteer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>

          {/* Harvest Times */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>
              Harvest Times
              {eventType === 'harvest' && <span className="badge bg-success ms-2">Filter active</span>}
            </p>
            {!selectedGarden.harvestTimes ? (
              <p className="text-muted small">No harvest times posted yet.</p>
            ) : (
              Object.entries(selectedGarden.harvestTimes).map(([id, slot]) => {
                const left = spotsLeft(slot);
                return (
                  <div key={id} className="user-portal-card" style={{ marginBottom: 10 }}>
                    <div className="user-portal-card__title">{slot.date} · {slot.start} – {slot.end}</div>
                    <div className="user-portal-card__meta">
                      {selectedGarden.name}
                      {typeof slot.spots === 'number' && ` · ${left} spots left`}
                    </div>
                    <button
                      type="button"
                      className="btn btn-success btn-sm mt-2"
                      disabled={typeof slot.spots === 'number' && left <= 0}
                      onClick={() => setRegisterSlot({ slotId: id, kind: 'harvest' })}
                    >Register</button>
                  </div>
                );
              })
            )}
          </div>

          {/* Volunteer Times */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>
              Volunteer Times
              {eventType === 'volunteer' && <span className="badge bg-success ms-2">Filter active</span>}
            </p>
            {!selectedGarden.volunteerTimes ? (
              <p className="text-muted small">No volunteer times posted yet.</p>
            ) : (
              Object.entries(selectedGarden.volunteerTimes).map(([id, slot]) => {
                const left = spotsLeft(slot);
                return (
                  <div key={id} className="user-portal-card" style={{ marginBottom: 10 }}>
                    <div className="user-portal-card__title">{slot.date} · {slot.start} – {slot.end}</div>
                    <div className="user-portal-card__meta">
                      {selectedGarden.name}
                      {typeof slot.spots === 'number' && ` · ${left} spots left`}
                    </div>
                    <button
                      type="button"
                      className="btn btn-success btn-sm mt-2"
                      disabled={typeof slot.spots === 'number' && left <= 0}
                      onClick={() => setRegisterSlot({ slotId: id, kind: 'volunteer' })}
                    >Register</button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Registration email modal */}
      {registerSlot && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register for this slot</h5>
                <button type="button" className="btn-close"
                  onClick={() => { setRegisterSlot(null); setRegisterEmail(''); }} />
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
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => { setRegisterSlot(null); setRegisterEmail(''); }}>Cancel</button>
                  <button type="submit" className="btn btn-success" disabled={registerSaving}>
                    {registerSaving ? 'Saving…' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
