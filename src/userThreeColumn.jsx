import React from 'react';

export default function threeColumn() {
    return (
    <div className="three-column-layout">
      <div className="column column-light">
        <p>Column 1 content</p>
      </div>
      <div className="column column-dark">
        <p>Column 2 content</p>
      </div>
      <div className="column column-light">
        <p>Column 3 content</p>
      </div>
    </div>
  );
}