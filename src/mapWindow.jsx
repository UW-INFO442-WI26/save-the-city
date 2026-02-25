import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SEATTLE } from './constants';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


export default function MapWindow({ searchQuery, selectedTags, eventType, onGardenSelect }) {
  const [gardens, setGardens] = useState([]);

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

  return (
    <MapContainer
      center={SEATTLE.center}
      zoom={SEATTLE.zoom}
      className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {gardens.map((garden, index) => (
        <Marker
          key={index}
          position={[garden.location.lat, garden.location.lng]}
          eventHandlers={{
            click: () => onGardenSelect(garden),
          }}
        >
          <Popup>{garden.name}</Popup>
        </Marker>
      ))}
      
    </MapContainer>
  );
}