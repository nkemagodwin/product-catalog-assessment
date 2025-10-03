import React from 'react';

const FilterSection = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  activeFilterCount,
  onClearAll
}) => {
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="filter-section">
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="clear-filters-button"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="filter-grid">
        {/* Category Filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">Category</h4>
          <div className="category-list">
            {categories.map(category => (
              <label key={category} className="category-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="category-checkbox"
                />
                <span className="category-label">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <h4 className="filter-group-title">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </h4>
          
          <div className="price-filter">
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="slider"
            />
            
            <div className="price-inputs">
              <div className="price-input-group">
                <label className="price-label">
                  Min Price
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="price-input"
                />
              </div>
              
              <div className="price-input-group">
                <label className="price-label">
                  Max Price
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])}
                  className="price-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;