import React, { useState } from 'react';

const Navbar = ({ onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Categories and their sub-items list
  const categories = [
    {
      name: 'Men',
      items: ['Topwear', 'Bottomwear', 'Belts', 'Watches', 'Footwear', 'Sports Wear']
    },
    {
      name: 'Women',
      items: ['Ethnic Wear', 'Western Wear', 'Footwear', 'Handbags', 'Beauty Products', 'Jewellery']
    },
    {
      name: 'Kids',
      items: ['Boys Clothing', 'Girls Clothing', 'Infant Wear', 'Toys', 'School Bags', 'Footwear']
    },
    {
      name: 'Beauty',
      items: ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Bath & Body', 'Appliances']
    },
    {
      name: 'Home & Kitchen',
      items: ['Bed Linen', 'Kitchenware', 'Decor', 'Lighting', 'Storage & Organizers', 'Cleaning']
    }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* Logo */}
        <a href="#" className="nav-logo">
          Trend<span className="logo-highlight">Nova</span>
        </a>

        {/* Desktop Menu Links with Dropdown */}
        <div className="nav-links">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="nav-item-dropdown"
              onMouseEnter={() => setActiveDropdown(cat.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link-btn">
                <span>{cat.name}</span>
                <svg className={`arrow-icon ${activeDropdown === cat.name ? 'rotate' : ''}`} width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Box */}
              {activeDropdown === cat.name && (
                <div className="dropdown-menu-box">
                  <div className="dropdown-grid">
                    {cat.items.map((subItem, subIndex) => (
                      <a key={subIndex} href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`} className="dropdown-sub-item">
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side Options */}
        <div className="nav-actions">
          
          {/* Search Box - Live typing par trigger hoga */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search TrendNova"
              className="search-input"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sign In */}
          <a href="#signin" className="action-item signin-desktop">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Sign In</span>
          </a>

          {/* View Cart */}
          <a href="#cart" className="action-item cart-wrapper" title="View Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="cart-badge">0</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="search-box mobile-search">
          <input
            type="text"
            placeholder="Search TrendNova"
            className="search-input"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="mobile-nav-links">
          {categories.map((cat, index) => (
            <div key={index} className="mobile-category-block">
              <div className="mobile-cat-title">{cat.name}</div>
              <div className="mobile-sub-grid">
                {cat.items.map((subItem, subIndex) => (
                  <a 
                    key={subIndex} 
                    href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setIsOpen(false)}
                    className="mobile-sub-link"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <a href="#signin" onClick={() => setIsOpen(false)} className="mobile-signin-btn">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Sign In</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;