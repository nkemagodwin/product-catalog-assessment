import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart();
    
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>
      
      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>
        
        <h3 className="product-title line-clamp-2" title={product.title}>
          {product.title}
        </h3>
        
        <div className="product-footer">
          <span className="product-price">
            ${product.price}
          </span>
          
          <div className="product-rating">
            <span className="rating-star">★</span>
            <span className="rating-value">
              {product.rating?.rate || 'N/A'}
            </span>
            <span className="rating-count">
              ({product.rating?.count || 0})
            </span>
          </div>
        </div>
        
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;