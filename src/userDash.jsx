import React, { useState } from 'react';
import MapWindow from './mapWindow';
import Accordian from './mobileUserAccordian';
import ThreeColumn from './userThreeColumn';
import SearchFilterBar from './SearchFilterBar';

export default function UserDash() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [eventType, setEventType] = useState('all');

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
        />
      </div>
      <div className="bottom-section">
        <div className="mobile">
          <Accordian />
        </div>
        <div className="desktop">
          <ThreeColumn />
        </div>
      </div>
    </div>
  );
}