import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import HostGardenForm from './hostGardenForm';
import { SEATTLE } from './constants';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

function PinDrop({ onPin }) {
    useMapEvents({
        click(e) {
            onPin(e.latlng);
        }
    });
    return null;
}

export default function HostLocationPicker({ onConfirm, onCancel }) {
    const [pinLocation, setPinLocation] = useState(null);
    const [showForm, setShowForm] = useState(false);

    function handleConfirmLocation() {
        setShowForm(true);
    }
    function handleFormSubmit(formData) {
        onConfirm({ location: pinLocation, ...formData });
    }
    function handleFormCancel() {
        setShowForm(false);
    }

    return (
        <div className="map-picker-container" style={{ position: 'relative' }}>
        <MapContainer
            center={SEATTLE.center}
            zoom={SEATTLE.zoom}
            className="map-overlay-map"
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <PinDrop onPin={setPinLocation} />
            {pinLocation && <Marker position={pinLocation} />}
        </MapContainer>

        <div className="map-picker-controls">
            <button onClick={onCancel} className="btn btn-danger">Cancel</button>
            <button
            onClick={handleConfirmLocation}
            className="btn btn-success"
            disabled={!pinLocation}
            >
            Confirm Location
            </button>
        </div>

        {showForm && (
            <HostGardenForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            />
        )}
        </div>
    );
}