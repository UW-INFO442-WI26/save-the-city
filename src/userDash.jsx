import React, { useState, useEffect } from 'react';
import MapWindow from './mapWindow';
import Accordian from './mobileUserAccordian';
import ThreeColumn from './userThreeColumn';

export default function UserDash() {
  return (
    <div className="user-dash">
      <MapWindow />
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