import React, { useState } from 'react';
import MapWindow from './mapWindow';
import ThreeColumn from './userThreeColumn';
import SearchFilterBar from './SearchFilterBar';

export default function UserDash() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [eventType, setEventType] = useState('all');
  const [selectedGarden, setSelectedGarden] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleClearFilters() {
    setSearchQuery('');
    setSelectedTags([]);
    setEventType('all');
  }

  return (
    <div className="user-dash" role="region" aria-label="User portal - find and explore community gardens">
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        eventType={eventType}
        onEventTypeChange={setEventType}
        onClear={handleClearFilters}
        onSearchSubmit={() => setSubmitted(true)}
      />
      <div className="map-container-wrapper" role="region" aria-label="Map of Seattle community gardens">
        <MapWindow
          searchQuery={searchQuery}
          selectedTags={selectedTags}
          eventType={eventType}
          onGardenSelect={setSelectedGarden}
          submitted={submitted}
          onSubmitHandled={() => setSubmitted(false)}
        />
      </div>

      {/* Modal popup — replaces the bottom bar */}
      <ThreeColumn
        selectedGarden={selectedGarden}
        onClose={() => setSelectedGarden(null)}
        eventType={eventType}
      />
    </div>
  );
}