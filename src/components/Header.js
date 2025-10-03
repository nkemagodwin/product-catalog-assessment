import React, { useState } from 'react';

const Header = ({ cartCount, isLoggedIn, onLogin, onLogout }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (isSignUp && authForm.password !== authForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (authForm.email && authForm.password) {
      onLogin();
      setShowAuthModal(false);
      setAuthForm({ email: '', password: '', confirmPassword: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openLogin = () => {
    setIsSignUp(false);
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setIsSignUp(true);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-main">
            <div className="logo-section">
              <h1>Product Catalog</h1>
              <p>Discover amazing products at great prices</p>
            </div>
            
            <div className="header-actions">
              {/* Cart Icon */}
              <div className="cart-section">
                <button className="cart-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="auth-section">
                {isLoggedIn ? (
                  <div className="user-menu">
                    <span className="welcome-text">Welcome, User!</span>
                    <button onClick={onLogout} className="logout-button">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <button onClick={openLogin} className="login-button">
                      Login
                    </button>
                    <button onClick={openSignUp} className="signup-button">
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <div className="modal-header">
              <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="close-button"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={authForm.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={authForm.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
              )}
              
              <button type="submit" className="submit-button">
                {isSignUp ? 'Create Account' : 'Login'}
              </button>
            </form>
            
            <div className="auth-switch">
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="switch-button"
                >
                  {isSignUp ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;