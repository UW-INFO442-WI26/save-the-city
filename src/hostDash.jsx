import React, { useState } from 'react';

export default function HostDash() {
  const [showMap, setShowMap] = useState(false);
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Host Dashboard</h1>
      <p>Welcome to the Host Dashboard! Here you can create / manage your community garden and volunteers/harvesters</p>
      <button className="btn btn-success" onClick={() => setShowMap(true)}>
        Register a New Garden
      </button>

      {showMap && (
        <div className="map-overlay">
          {/* Placeholder for the map component */}
          <button onClick={() => setShowMap(false)} className="btn btn-danger close-btn">Cancel</button>
        </div>
      )}
    </div>
  );
}