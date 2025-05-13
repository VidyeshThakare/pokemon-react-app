import React from "react";
import './Filter.css'

function Filter({ types, selectedType, setSelectedType }) {
  return (
    <div className="filter">
      
      <select
        id="typeFilter"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
