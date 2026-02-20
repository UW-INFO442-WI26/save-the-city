import React, { useState } from 'react';
import { SEATTLE } from './constants';

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
    'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function HostGardenForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        gardenName: '',
        description: '',
        address: '',
        city: SEATTLE.name,
        state: SEATTLE.state,
        zip: SEATTLE.defaultZip,
        email: '',
        phone: '',
        socialLinks: [''],
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSocialLinkChange(index, value) {
        setForm(prev => {
            const newLinks = [...prev.socialLinks];
            newLinks[index] = value;
            return { ...prev, socialLinks: newLinks };
        });
    }

    function addSocialLink() {
        setForm(prev => ({ ...prev, socialLinks: [...prev.socialLinks, ''] }));
    }

    function removeSocialLink(index) {
        const updatedLinks = form.socialLinks.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, socialLinks: updated.length ? updatedLinks : [''] }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ ...form, socialLinks: form.socialLinks.filter(link => link.trim())  
        });
    }

    return (

        <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">

            <div className="modal-header">
                <h5 className="modal-title">Garden Details</h5>
                <button type="button" className="btn-close" onClick={onCancel} />
            </div>

            <div className="modal-body">
                <form id="garden-form" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Garden Name</label>
                    <input
                    type="text"
                    name="gardenName"
                    className="form-control"
                    value={form.gardenName}
                    onChange={handleChange}
                    placeholder="e.g. Sunrise Community Garden"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Short Description</label>
                    <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Briefly describe your garden..."
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Street Address</label>
                    <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-5">
                    <label className="form-label fw-semibold">City</label>
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={form.city}
                        onChange={handleChange}
                        placeholder={SEATTLE.name}
                    />
                    </div>
                    <div className="col-3">
                    <label className="form-label fw-semibold">State</label>
                    <select
                        name="state"
                        className="form-select"
                        value={form.state}
                        onChange={handleChange}
                    >
                        <option value="">--</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    </div>
                    <div className="col-4">
                    <label className="form-label fw-semibold">ZIP</label>
                    <input
                        type="text"
                        name="zip"
                        className="form-control"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder={SEATTLE.defaultZip}
                    />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="garden@example.com"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                    Phone Number <span className="text-muted fw-normal small">(optional)</span>
                    </label>
                    <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (206) 555-0123"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                    Social Media Links <span className="text-muted fw-normal small">(optional)</span>
                    </label>
                    {form.socialLinks.map((link, i) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                        <input
                        type="url"
                        className="form-control"
                        value={link}
                        onChange={e => handleSocialChange(i, e.target.value)}
                        placeholder="https://instagram.com/yourgarden"
                        />
                        <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeSocialLink(i)}
                        >✕</button>
                    </div>
                    ))}
                    <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={addSocialLink}
                    >
                    + Add Link
                    </button>
                </div>

                </form>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Back</button>
                <button type="submit" form="garden-form" className="btn btn-success">Register Garden</button>
            </div>

            </div>
        </div>
        </div>
    );
}