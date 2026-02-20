import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import { SEATTLE } from './constants';

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

export default function MapWindow({ searchQuery, selectedTags, eventType } = {}) {
  return (
    <MapContainer
      center={SEATTLE.center}
      zoom={SEATTLE.zoom}
      className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}