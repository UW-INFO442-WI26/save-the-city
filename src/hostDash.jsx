import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { database } from './firebase';
import { SEATTLE } from './constants';
import HostLocationPicker from './hostLocationPicker';

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

function EditGardenForm({ garden, onClose }) {
  const [form, setForm] = useState({
    name: garden?.name || '',
    description: garden?.description || '',
    address: garden?.address || '',
    city: garden?.city || SEATTLE.name,
    state: garden?.state || SEATTLE.state,
    zip: garden?.zip || SEATTLE.defaultZip,
    email: garden?.email || '',
    phone: garden?.phone || '',
    tags: Array.isArray(garden?.tags) ? garden.tags.join(', ') : (garden?.tags || ''),
    socialLinks: Array.isArray(garden?.socialLinks) && garden.socialLinks.length > 0
      ? [...garden.socialLinks]
      : [''],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSocialLinkChange(index, value) {
    setForm((prev) => {
      const newLinks = [...prev.socialLinks];
      newLinks[index] = value;
      return { ...prev, socialLinks: newLinks };
    });
  }

  function addSocialLink() {
    setForm((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, ''] }));
  }

  function removeSocialLink(index) {
    const updated = form.socialLinks.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, socialLinks: updated.length ? updated : [''] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!garden?.firebaseId) {
      setError('This garden has no Firebase id.');
      return;
    }
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const socialLinks = form.socialLinks.filter((link) => link.trim());

    try {
      setSaving(true);
      const gardenRef = ref(database, `gardens/${garden.firebaseId}`);
      await update(gardenRef, {
        name: form.name.trim(),
        description: form.description.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state,
        zip: form.zip.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        tags,
        socialLinks,
      });
      onClose();
    } catch (err) {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ overflowY: 'auto', position: 'fixed', inset: 0, zIndex: 1050, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="modal-dialog modal-dialog-centered" style={{margin: '2vh auto', maxHeight: '96vh', overflowY: 'auto' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit garden details</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Garden name</label>
                <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <input type="text" name="address" className="form-control" value={form.address} onChange={handleChange} required />
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label fw-semibold">City</label>
                  <input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} required />
                </div>
                <div className="col-3">
                  <label className="form-label fw-semibold">State</label>
                  <select name="state" className="form-select" value={form.state} onChange={handleChange} required>
                    <option value="">--</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label fw-semibold">ZIP</label>
                  <input type="text" name="zip" className="form-control" value={form.zip} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Tags (comma-separated)</label>
                <input type="text" name="tags" className="form-control" value={form.tags} onChange={handleChange} placeholder="Vegetables, Herbs" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <input type="tel" name="phone" className="form-control" value={form.phone} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Social links</label>
                {form.socialLinks.map((link, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <input type="url" className="form-control" value={link} onChange={(e) => handleSocialLinkChange(i, e.target.value)} placeholder="https://..." />
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeSocialLink(i)}>✕</button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={addSocialLink}>+ Add link</button>
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function GardenTimeForm({ garden, onClose }) {
  const [form, setForm] = useState({
    kind: 'harvest', // 'harvest' or 'volunteer'
    date: '',
    start: '',
    end: '',
    spots: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!garden?.firebaseId) {
      setError('This garden is missing its Firebase id. Try registering it again.');
      return;
    }

    if (!form.date || !form.start || !form.end) {
      setError('Please fill in date, start, and end time.');
      return;
    }

    const spotsNumber = form.spots ? Number(form.spots) : 0;
    const pathSegment = form.kind === 'volunteer' ? 'volunteerTimes' : 'harvestTimes';

    try {
      setSaving(true);
      const timesRef = ref(database, `gardens/${garden.firebaseId}/${pathSegment}`);
      await push(timesRef, {
        date: form.date,
        start: form.start,
        end: form.end,
        spots: spotsNumber,
      });
      onClose();
    } catch (err) {
      setError('There was a problem saving this time slot. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add garden time</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Type</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="timeKindHarvest"
                      name="kind"
                      value="harvest"
                      checked={form.kind === 'harvest'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="timeKindHarvest">
                      Harvest time
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="timeKindVolunteer"
                      name="kind"
                      value="volunteer"
                      checked={form.kind === 'volunteer'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="timeKindVolunteer">
                      Volunteer time
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">Start time</label>
                  <input
                    type="time"
                    name="start"
                    className="form-control"
                    value={form.start}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">End time</label>
                  <input
                    type="time"
                    name="end"
                    className="form-control"
                    value={form.end}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Spots available <span className="text-muted fw-normal small">(optional)</span>
                </label>
                <input
                  type="number"
                  name="spots"
                  className="form-control"
                  min="0"
                  value={form.spots}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                />
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? 'Saving…' : 'Save time'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function countGardenRegistrations(garden) {
  if (!garden) return { total: 0, volunteer: 0, harvest: 0 };

  let volunteer = 0;
  let harvest = 0;

  if (garden.volunteerTimes) {
    Object.values(garden.volunteerTimes).forEach((slot) => {
      if (slot && slot.registrations) {
        volunteer += Object.keys(slot.registrations).length;
      }
    });
  }

  if (garden.harvestTimes) {
    Object.values(garden.harvestTimes).forEach((slot) => {
      if (slot && slot.registrations) {
        harvest += Object.keys(slot.registrations).length;
      }
    });
  }

  return { total: volunteer + harvest, volunteer, harvest };
}

export default function HostDash() {
  const [showMap, setShowMap] = useState(false);
  const [gardens, setGardens] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [hostEmail, setHostEmail] = useState('');

  // Keep HostDash in sync with all gardens in Firebase so hosts can manage older gardens too.
  useEffect(() => {
    const gardensRef = ref(database, 'gardens');
    const unsubscribe = onValue(gardensRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setGardens([]);
        return;
      }

      const normalizedGardens = Object.entries(data).map(([id, garden]) => ({
        id,
        firebaseId: id,
        ...garden,
      }));

      setGardens(normalizedGardens);
    });

    return () => unsubscribe();
  }, []);

  function handleGardenConfirm(_newGarden) {
    // The Firebase listener above will pick up the new garden and refresh the list.
    setShowMap(false);
  }

  const filteredGardens = useMemo(() => {
    const emailFilter = hostEmail.trim().toLowerCase();
    const q = query.trim().toLowerCase();

    let base = gardens;

    // Limit to gardens owned by this host's email, if provided.
    if (emailFilter) {
      base = base.filter((g) => (g.email || '').toLowerCase() === emailFilter);
    }

    if (!q) return base;

    return base.filter((g) => {
      const name = (g.name || '').toLowerCase();
      const address = (g.address || '').toLowerCase();
      const tags = Array.isArray(g.tags)
        ? g.tags.join(' ').toLowerCase()
        : String(g.tags || '').toLowerCase();
      return name.includes(q) || address.includes(q) || tags.includes(q);
    });
  }, [gardens, query, hostEmail]);

  const selectedGarden = gardens.find((g) => g.id === selectedId) || null;
  const registrationCounts = useMemo(
    () => (selectedGarden ? countGardenRegistrations(selectedGarden) : { total: 0, volunteer: 0, harvest: 0 }),
    [selectedGarden]
  );

  async function handleDeleteSelected() {
    if (!selectedGarden) return;

    const ok = window.confirm(
      `Delete "${selectedGarden.name}"?\n\nThis will remove the garden from your dashboard.`
    );
    if (!ok) return;

    if (!selectedGarden.firebaseId) {
      window.alert('This garden is missing its Firebase id and cannot be deleted.');
      return;
    }

    try {
      const gardenRef = ref(database, `gardens/${selectedGarden.firebaseId}`);
      await remove(gardenRef);
      setSelectedId(null);
      // The Firebase listener will update the gardens list after deletion.
    } catch (err) {
      window.alert('There was a problem deleting this garden. Please try again.');
    }
  }

  return (
    <div className="host-page page-content">
      <div className="container py-4">
        {/* Header + Quick actions */}
        <section className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div className="host-hero">
            <h1 className="host-hero__title mb-1">Host Dashboard</h1>
            <p className="host-hero__lead mb-0">Add gardens and manage them in one place.</p>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setShowMap(true)}
              aria-haspopup="dialog"
              aria-expanded={showMap ? 'true' : 'false'}
            >
              + Register garden
            </button>

            <Link to="/user" className="btn btn-outline-secondary">
              View as volunteer
            </Link>
          </div>
        </section>

        {/* Main layout: list + details */}
        <section className="row g-4">
          {/* Left: Garden list */}
          <div className="col-12 col-lg-7">
            <div className="host-card">
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-3">
                <div>
                  <h2 className="h5 mb-1">My gardens</h2>
                  <div className="text-muted small">
                    Enter your email to see gardens you host.
                  </div>
                </div>

                <div className="w-100 w-md-auto" style={{ maxWidth: 320 }}>
                  <label htmlFor="hostEmail" className="form-label small mb-1">
                    Your email
                  </label>
                  <input
                    id="hostEmail"
                    type="email"
                    className="form-control form-control-sm mb-2"
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                    placeholder="garden@example.com"
                  />

                  <label htmlFor="gardenSearch" className="form-label small mb-1">
                    Search
                  </label>
                  <input
                    id="gardenSearch"
                    className="form-control form-control-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Name, address, or tag…"
                  />
                </div>
              </div>

              {filteredGardens.length === 0 ? (
                <div className="host-card host-card--empty">
                  <div className="fw-semibold mb-1">
                    {gardens.length === 0 ? 'No gardens yet' : 'No matches'}
                  </div>
                  <div className="text-muted">
                    {gardens.length === 0
                      ? 'Register your first garden to appear here.'
                      : 'Try a different search term.'}
                  </div>

                  {gardens.length === 0 && (
                    <button
                      type="button"
                      className="btn btn-success btn-sm mt-3"
                      onClick={() => setShowMap(true)}
                    >
                      Register a garden
                    </button>
                  )}
                </div>
              ) : (
                <div className="d-grid gap-2">
                  {filteredGardens.map((g) => {
                    const isSelected = g.id === selectedId;
                    const tagText = Array.isArray(g.tags) ? g.tags.join(' · ') : g.tags || '';

                    return (
                      <button
                        key={g.id}
                        type="button"
                        className={`text-start host-list-item ${
                          isSelected ? 'host-list-item--active' : ''
                        }`}
                        onClick={() => setSelectedId(g.id)}
                        aria-pressed={isSelected ? 'true' : 'false'}
                      >
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <div>
                            <div className="fw-semibold">{g.name}</div>
                            <div className="text-muted small">
                              {g.address || 'No address provided'}
                            </div>
                            {tagText ? (
                              <div className="text-muted small mt-1">{tagText}</div>
                            ) : null}
                          </div>
                          <span className="badge text-bg-light border">Garden</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Details panel */}
          <div className="col-12 col-lg-5">
            <div className="host-card">
              <h2 className="h5 mb-1">Selected garden</h2>
              <div className="text-muted small mb-3">
                Choose a garden on the left to enable actions.
              </div>

              {!selectedGarden ? (
                <div className="host-card host-card--empty">
                  <div className="fw-semibold mb-1">Nothing selected</div>
                  <div className="text-muted">Pick a garden to edit details or manage times.</div>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <div className="fw-semibold">{selectedGarden.name}</div>
                    <div className="text-muted small">{selectedGarden.address}</div>
                    <div className="text-muted small mt-1">
                      Registered: {registrationCounts.total} total (Volunteer: {registrationCounts.volunteer}, Harvest: {registrationCounts.harvest})
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => setShowEditForm(true)}
                      disabled={!selectedGarden.firebaseId}
                    >
                      Edit details
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setShowTimeForm(true)}
                      disabled={!selectedGarden.firebaseId}
                    >
                      Manage times
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleDeleteSelected}
                    >
                      Delete
                    </button>
                  </div>

                  <hr />

                  <div className="text-muted small">
                    Tip: Keep your description and tags clear so volunteers know what to expect.
                  </div>
                </>
              )}
            </div>

            <div className="text-muted small mt-3">
              Keyboard: use Tab to move through gardens, press Enter to select.
            </div>
          </div>
        </section>
      </div>

      {showMap && (
        <div
          className="map-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Register a new garden"
        >
          <HostLocationPicker onConfirm={handleGardenConfirm} onCancel={() => setShowMap(false)} />
        </div>
      )}

      {showTimeForm && selectedGarden && (
        <GardenTimeForm garden={selectedGarden} onClose={() => setShowTimeForm(false)} />
      )}

      {showEditForm && selectedGarden && (
        <EditGardenForm
          key={selectedGarden.firebaseId}
          garden={selectedGarden}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}