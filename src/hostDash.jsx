import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HostLocationPicker from './hostLocationPicker';

export default function HostDash() {
  const [showMap, setShowMap] = useState(false);
  const [gardens, setGardens] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleGardenConfirm(newGarden) {
    const name = newGarden.name || newGarden.gardenName || 'Untitled Garden';

    const address =
      newGarden.address ||
      (newGarden.street
        ? `${newGarden.street}, ${newGarden.city || ''}, ${newGarden.state || ''} ${
            newGarden.zip || ''
          }`
            .replace(/\s+/g, ' ')
            .trim()
        : '');

    const tags = newGarden.tags || [];

    const normalized = {
      ...newGarden,
      name,
      address,
      tags,
    };

    setGardens((prev) => [...prev, { id: Date.now(), ...normalized }]);
    setShowMap(false);
  }

  const filteredGardens = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return gardens;

    return gardens.filter((g) => {
      const name = (g.name || '').toLowerCase();
      const address = (g.address || '').toLowerCase();
      const tags = Array.isArray(g.tags)
        ? g.tags.join(' ').toLowerCase()
        : String(g.tags || '').toLowerCase();
      return name.includes(q) || address.includes(q) || tags.includes(q);
    });
  }, [gardens, query]);

  const selectedGarden = gardens.find((g) => g.id === selectedId) || null;

  function handleDeleteSelected() {
    if (!selectedGarden) return;

    const ok = window.confirm(
      `Delete "${selectedGarden.name}"?\n\nThis will remove the garden from your dashboard.`
    );
    if (!ok) return;

    setGardens((prev) => prev.filter((g) => g.id !== selectedGarden.id));
    setSelectedId(null);
  }

  return (
    <div className="host-page page-content">
      <div className="container py-4">
        {/* Header + Quick actions */}
        <section className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div>
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
                  <div className="text-muted small">Select a garden to see actions.</div>
                </div>

                <div className="w-100 w-md-auto" style={{ maxWidth: 320 }}>
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
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline-success btn-sm">
                      Edit details
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm">
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
    </div>
  );
}