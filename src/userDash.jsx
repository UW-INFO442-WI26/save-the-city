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
      />
      <div className="map-container-wrapper">
        <MapWindow
          searchQuery={searchQuery}
          selectedTags={selectedTags}
          eventType={eventType}
          onGardenSelect={setSelectedGarden}
        />
      </div>

      <div className="bottom-section">
        <div className="mobile">
          <Accordian selectedGarden={selectedGarden}/>
        </div>
        <div className="desktop">
          <ThreeColumn selectedGarden={selectedGarden}/>
        </div>
      </div>
    </div>
  );
}