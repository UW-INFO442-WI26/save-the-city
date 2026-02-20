import React, { useState } from 'react';
import { GARDEN_TAGS, SUGGESTED_SEARCHES } from './constants';

const EVENT_TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'volunteer', label: 'Volunteer times' },
  { value: 'harvest', label: 'Harvest times' },
];

export default function SearchFilterBar({ searchQuery, onSearchChange, selectedTags, onTagsChange, eventType, onEventTypeChange, onClear }) {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);

  function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  }

  function applySuggestion(sug) {
    if (sug.type === 'tag') {
      if (selectedTags.includes(sug.value)) {
        onTagsChange(selectedTags.filter((t) => t !== sug.value));
      } else {
        onTagsChange([...selectedTags, sug.value]);
      }
    } else if (sug.type === 'event') {
      onEventTypeChange(eventType === sug.value ? 'all' : sug.value);
    } else if (sug.type === 'search') {
      onSearchChange(searchQuery === sug.value ? '' : sug.value);
    }
  }

  function isSuggestionActive(sug) {
    if (sug.type === 'tag') return selectedTags.includes(sug.value);
    if (sug.type === 'event') return eventType === sug.value;
    if (sug.type === 'search') return searchQuery === sug.value;
    return false;
  }

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0 || eventType !== 'all';

  return (
    <div className="search-filter-bar">
      <div className="search-filter-bar__row">
        <div className="search-filter-bar__search">
          <input
            type="search"
            className="form-control search-filter-bar__input"
            placeholder="Search by garden name or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search gardens"
          />
        </div>

        <div className="search-filter-bar__event-type">
          <span className="search-filter-bar__label">Show:</span>
          <div className="btn-group btn-group-sm" role="group" aria-label="Event type filter">
            {EVENT_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn ${eventType === opt.value ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => onEventTypeChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="search-filter-bar__tags dropdown">
          <button
            type="button"
            className="btn btn-outline-success btn-sm dropdown-toggle"
            onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
            aria-expanded={tagDropdownOpen}
            aria-haspopup="true"
            id="tagFilterDropdown"
          >
            Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
          </button>
          <ul
            className={`dropdown-menu ${tagDropdownOpen ? 'show' : ''}`}
            aria-labelledby="tagFilterDropdown"
          >
            {GARDEN_TAGS.map((tag) => (
              <li key={tag}>
                <label className="dropdown-item d-flex align-items-center gap-2 mb-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="form-check-input"
                  />
                  <span>{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm search-filter-bar__clear"
            onClick={onClear}
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="search-filter-bar__suggested">
        <span className="search-filter-bar__suggested-label">Suggested:</span>
        <div className="search-filter-bar__suggested-chips">
          {SUGGESTED_SEARCHES.map((sug) => (
            <button
              key={`${sug.type}-${sug.value}`}
              type="button"
              className={`search-filter-bar__chip ${isSuggestionActive(sug) ? 'search-filter-bar__chip--active' : ''}`}
              onClick={() => applySuggestion(sug)}
            >
              {sug.label}
            </button>
          ))}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="search-filter-bar__active-tags">
          {selectedTags.map((tag) => (
            <span key={tag} className="search-filter-bar__tag-pill">
              {tag}
              <button
                type="button"
                className="search-filter-bar__tag-remove"
                onClick={() => toggleTag(tag)}
                aria-label={`Remove ${tag} filter`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {tagDropdownOpen && (
        <div
          className="search-filter-bar__backdrop"
          onClick={() => setTagDropdownOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
