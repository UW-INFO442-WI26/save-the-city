import React, { useState } from 'react';
import HostLocationPicker from './hostLocationPicker';

export default function HostDash() {
  const [showMap, setShowMap] = useState(false);
  return (
    <div className="container mt-5">
      <h1 className="mb-4 headertemp">Host Dashboard</h1>
      <p className="headertemp">Welcome to the Host Dashboard! Here you can create / manage your community garden and volunteers/harvesters</p>
      <button className="btn btn-success" onClick={() => setShowMap(true)}>
        Register a New Garden
      </button>

      {showMap && (
        <div className="map-overlay">
          <HostLocationPicker
            onConfirm={(location) => {
              console.log('Location confirmed:', location);
              setShowMap(false);
            }}
            onCancel={() => setShowMap(false)}
          />
        </div>
      )}
    </div>
  );
}