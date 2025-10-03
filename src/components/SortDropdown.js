import React from 'react';
import { SORT_OPTIONS } from '../utils/constants';

const SortDropdown = ({ sortOption, onSortChange }) => {
  const sortOptions = [
    { value: SORT_OPTIONS.DEFAULT, label: 'Default' },
    { value: SORT_OPTIONS.PRICE_LOW_HIGH, label: 'Price: Low to High' },
    { value: SORT_OPTIONS.PRICE_HIGH_LOW, label: 'Price: High to Low' },
    { value: SORT_OPTIONS.NAME_A_Z, label: 'Name: A to Z' },
    { value: SORT_OPTIONS.NAME_Z_A, label: 'Name: Z to A' }
  ];

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort" className="sort-label">
        Sort by
      </label>
      
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;