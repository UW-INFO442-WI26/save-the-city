import React from 'react';

export default function threeColumn() {
    return (
    <div className="three-column-layout">
      <div className="column column-light">
        <p className="column-header">Community Garden Info</p>
      </div>
      <div className="column column-light">
        <p className="column-header">Register for Harvest Time</p>
      </div>
      <div className="column column-light">
        <p className="column-header">Register for Volunteer Time</p>
      </div>
    </div>
  );
}