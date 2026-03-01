import React, { useState } from 'react';
import MapWindow from './mapWindow';
import Accordian from './mobileUserAccordian';
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
    <div className="user-dash">
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
      <div className="map-container-wrapper">
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