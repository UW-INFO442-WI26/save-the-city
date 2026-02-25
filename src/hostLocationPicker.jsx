import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import HostGardenForm from './hostGardenForm';
import { SEATTLE } from './constants';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import { database } from './firebase';
import { ref, push, onValue } from 'firebase/database';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


function PinDrop({ onPin }) {
  useMapEvents({
    click(e) {
      onPin(e.latlng);
    },
  });
  return null;
}

export default function HostLocationPicker({ onConfirm, onCancel }) {
  const [pinLocation, setPinLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [gardens, setGardens] = useState([]);

  // Listen for gardens from Firebase and show them on the map
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

  function handleConfirmLocation() {
    if (!pinLocation) return;
    setShowForm(true);
  }

  function handleFormSubmit(formData) {
    const gardenData = {
      location: {
        lat: pinLocation.lat,
        lng: pinLocation.lng,
      },
      ...formData,
    };

    // Write to Firebase
    const gardensRef = ref(database, 'gardens');
    push(gardensRef, gardenData);

    onConfirm(gardenData);
    setPinLocation(null);
    setShowForm(false);
  }

  function handleFormCancel() {
    setShowForm(false);
  }

  return (
    <div className="map-picker-container">
      <MapContainer
        center={SEATTLE.center}
        zoom={SEATTLE.zoom}
        className="map-overlay-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <PinDrop onPin={setPinLocation} />

        {/* Pin the user just dropped */}
        {pinLocation && <Marker position={pinLocation} />}

        {/* All gardens from Firebase */}
        {gardens.map((garden, index) => (
          <Marker
            key={index}
            position={[garden.location.lat, garden.location.lng]}
          />
        ))}
      </MapContainer>

      <div className="map-picker-controls">
        <button onClick={onCancel} className="btn btn-outline-danger">
          Cancel
        </button>
        <button
          onClick={handleConfirmLocation}
          className="btn btn-success"
          disabled={!pinLocation}
        >
          Confirm Location
        </button>
      </div>

      {showForm && (
        <HostGardenForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
      )}
    </div>
  );
}