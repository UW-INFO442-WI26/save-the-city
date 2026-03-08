import { useState } from 'react';
import { useAuth } from './Auth';

export default function RoleSelector() {
  const { saveRole } = useAuth();
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleConfirm() {
    if (!selected) return;
    setSaving(true);
    await saveRole(selected);
    setSaving(false);
  }

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="role-selector-title" aria-describedby="role-selector-desc">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-success border-2 shadow">

          <div className="modal-header bg-success text-white border-0">
            <h5 id="role-selector-title" className="modal-title fw-bold">Welcome! How will you use the platform?</h5>
          </div>

          <div className="modal-body p-4" id="role-selector-desc">
            <p className="text-muted small mb-4">
              Choose how you'd like to get started. This determines what you'll see after logging in.
            </p>

            <div className="d-flex flex-column gap-3 mb-2">

              {/* Volunteer card */}
              <button
                type="button"
                onClick={() => setSelected('volunteer')}
                aria-pressed={selected === 'volunteer'}
                aria-label="Choose Volunteer or Visitor to browse gardens and sign up for times"
                className={`btn text-start p-3 border-2 rounded-3 ${
                  selected === 'volunteer'
                    ? 'btn-success border-success'
                    : 'btn-outline-success'
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3">🌱</span>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">Volunteer / Visitor</div>
                    <div className="small opacity-75">
                      Browse community gardens on the map, sign up for harvest and volunteer times.
                    </div>
                  </div>
                  {selected === 'volunteer' && (
                    <span className="badge bg-white text-success fw-bold fs-6">✓</span>
                  )}
                </div>
              </button>

              {/* Host card */}
              <button
                type="button"
                onClick={() => setSelected('host')}
                aria-pressed={selected === 'host'}
                aria-label="Choose Garden Host to register and manage your garden"
                className={`btn text-start p-3 border-2 rounded-3 ${
                  selected === 'host'
                    ? 'btn-success border-success'
                    : 'btn-outline-success'
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3">🏡</span>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">Garden Host</div>
                    <div className="small opacity-75">
                      Register and manage your community garden, set harvest and volunteer times.
                    </div>
                  </div>
                  {selected === 'host' && (
                    <span className="badge bg-white text-success fw-bold fs-6">✓</span>
                  )}
                </div>
              </button>

            </div>
          </div>

          <div className="modal-footer border-0 pt-0 px-4 pb-4">
            <button
              type="button"
              className="btn btn-success w-100 py-2 fw-semibold"
              disabled={!selected || saving}
              onClick={handleConfirm}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Saving…
                </>
              ) : (
                'Get started'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}