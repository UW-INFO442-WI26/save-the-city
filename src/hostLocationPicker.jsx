import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';

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

    return (
        <div className="map-picker-container">
            <MapContainer
                center={[47.6061, -122.3328]} // Seattle Center coordinates
                zoom={10}
                className="map-overlay-map">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <PinDrop onPin={setPinLocation} />
                {pinLocation && <Marker position={pinLocation} />}
            </MapContainer>
            <div className="map-picker-controls">
                <button onClick={onCancel} className="btn btn-danger">Cancel</button>
                <button
                    onClick={() => onConfirm(pinLocation)}
                    className="btn btn-success"
                    disabled={!pinLocation}
                >
                    Confirm Location
                </button>
            </div>
        </div>
    );
}