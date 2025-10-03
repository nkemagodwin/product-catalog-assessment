// src/App.jsx
import { useState, useMemo } from 'react';
import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import SortDropdown from './components/SortDropdown';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import Footer from './components/Footer';
import { SORT_OPTIONS } from './utils/constants';
import './App.css';

function App() {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.DEFAULT);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Apply sorting
    switch (sortOption) {
      case SORT_OPTIONS.PRICE_LOW_HIGH:
        filtered.sort((a, b) => a.price - b.price);
        break;
      case SORT_OPTIONS.PRICE_HIGH_LOW:
        filtered.sort((a, b) => b.price - a.price);
        break;
      case SORT_OPTIONS.NAME_A_Z:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SORT_OPTIONS.NAME_Z_A:
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sort (keep original order)
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategories, priceRange, sortOption]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortOption(SORT_OPTIONS.DEFAULT);
  };

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartCount(0);
  };

  const activeFilterCount = [
    searchTerm,
    selectedCategories.length,
    priceRange[0] > 0 || priceRange[1] < 1000
  ].filter(Boolean).length;

  if (error) {
    return (
      <div className="app">
        <Header 
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <div className="app-error">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Error Loading Products</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <div className="app-container">
        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-row">
            {/* Search */}
            <div className="search-container">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            {/* Sort */}
            <div className="sort-container">
              <SortDropdown 
                sortOption={sortOption}
                onSortChange={setSortOption}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <FilterSection
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              activeFilterCount={activeFilterCount}
              onClearAll={clearAllFilters}
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2>
            {loading ? 'Loading products...' : `${filteredProducts.length} products found`}
          </h2>
          
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="clear-filters-button"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="clear-all-button"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;