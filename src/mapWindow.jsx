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


export default function MapWindow({ searchQuery, selectedTags, eventType, onGardenSelect, submitted, onSubmitHandled }) {
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    const gardensRef = ref(database, 'gardens');
    const unsubscribe = onValue(gardensRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setGardens([]);
        return;
      }
      const withIds = Object.entries(data).map(([id, g]) => ({ ...g, firebaseId: id }));
      setGardens(withIds);
    });
    return () => unsubscribe();
  }, []);

  const filteredGardens = React.useMemo(() => {
    let list = gardens;

    if (eventType === 'harvest') {
      list = list.filter(
        (g) => g.harvestTimes && Object.keys(g.harvestTimes).length > 0
      );
    } else if (eventType === 'volunteer') {
      list = list.filter(
        (g) => g.volunteerTimes && Object.keys(g.volunteerTimes).length > 0
      );
    }

    const q = (searchQuery || '').trim().toLowerCase();
    if (q) {
      list = list.filter((g) => {
        const name = (g.name || '').toLowerCase();
        const desc = (g.description || '').toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    if (selectedTags && selectedTags.length > 0) {
      list = list.filter((g) => {
        const tags = Array.isArray(g.tags) ? g.tags : [];
        return selectedTags.every((t) => tags.some((gt) => String(gt).toLowerCase() === t.toLowerCase()));
      });
    }

    return list;
  }, [gardens, eventType, searchQuery, selectedTags]);

useEffect(() => {
    if (!submitted) return;
    if (filteredGardens.length === 1) {
      onGardenSelect(filteredGardens[0]);
    }
    onSubmitHandled();
  }, [submitted, filteredGardens]);

  return (
    <MapContainer
      center={SEATTLE.center}
      zoom={SEATTLE.zoom}
      className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {filteredGardens.map((garden, index) => (
        <Marker
          key={garden.firebaseId || index}
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