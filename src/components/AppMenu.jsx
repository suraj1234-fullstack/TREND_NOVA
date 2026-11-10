import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartModal from './cartmodel';

const AppMenu = () => {
  const navigate = useNavigate();
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Cart count sync karne ke liye
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('trendnova_cart') || '[]');
      const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalCount);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    // Custom event listener agar same window me cart update ho
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <>
      {/* Mobile Glassmorphism Bottom Navigation Bar */}
      <div className="mobile-glass-bottom-nav">
        
        {/* 1. Cart Option */}
        <div 
          onClick={() => setShowCartModal(true)} 
          className="glass-nav-item"
        >
          <div className="glass-icon-wrapper">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && <span className="glass-cart-badge">{cartCount}</span>}
          </div>
          <span>Cart</span>
        </div>

        {/* 2. Men */}
        <div 
          onClick={() => navigate('/search?q=men')} 
          className="glass-nav-item"
        >
          <div className="glass-icon-wrapper">
            <i className="fa-solid fa-shirt"></i>
          </div>
          <span>Men</span>
        </div>

        {/* 3. Women */}
        <div 
          onClick={() => navigate('/search?q=women')} 
          className="glass-nav-item"
        >
          <div className="glass-icon-wrapper">
            <i className="fa-solid fa-vest-patches"></i>
          </div>
          <span>Women</span>
        </div>

        {/* 4. Kids */}
        <div 
          onClick={() => navigate('/search?q=kids')} 
          className="glass-nav-item"
        >
          <div className="glass-icon-wrapper">
            <i className="fa-solid fa-child-reaching"></i>
          </div>
          <span>Kids</span>
        </div>

        {/* 5. Beauty */}
        <div 
          onClick={() => navigate('/search?q=beauty')} 
          className="glass-nav-item"
        >
          <div className="glass-icon-wrapper">
            <i className="fa-solid fa-spray-can-sparkles"></i>
          </div>
          <span>Beauty</span>
        </div>

      </div>

      {/* Cart Modal Popup Integration */}
      {showCartModal && (
        <CartModal 
          cartItems={JSON.parse(localStorage.getItem('trendnova_cart') || '[]')} 
          setCartItems={(newCart) => {
            localStorage.setItem('trendnova_cart', JSON.stringify(newCart));
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new Event('cartUpdated'));
          }} 
          onClose={() => setShowCartModal(false)} 
        />
      )}

      {/* Embedded Apple-like Glassmorphism Styling */}
      {/* Embedded Apple-like Glassmorphism Styling */}
      <style>{`
        .mobile-glass-bottom-nav {
          display: none; /* Desktop par hide rahega */
        }

        @media (max-width: 768px) {
          .mobile-glass-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            width: 94%;
            max-width: 420px;
            height: 66px;
            
            /* Apple jaisa shiny transparent glass background */
            background: linear-gradient(
              135deg, 
              rgba(255, 255, 255, 0.85) 0%, 
              rgba(255, 255, 255, 0.45) 100%
            );
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            
            /* Shiny premium border & depth shadows */
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.12), 
              0 4px 12px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.9); /* Top shiny highlight line */
            
            border-radius: 28px; /* Thoda aur smooth aur premium curve */
            z-index: 9999;
            align-items: center;
            justify-content: space-around;
            padding: 0 10px;
          }

          .glass-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #1e293b;
            font-size: 11px;
            font-weight: 700;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            flex: 1;
            padding: 6px 0;
            border-radius: 16px;
          }

          .glass-nav-item:hover {
            color: #db2777;
            background: rgba(255, 255, 255, 0.5);
            transform: translateY(-3px);
          }

          .glass-icon-wrapper {
            position: relative;
            font-size: 19px;
            margin-bottom: 3px;
          }

          .glass-cart-badge {
            position: absolute;
            top: -6px;
            right: -10px;
            background: #db2777;
            color: #fff;
            font-size: 9px;
            padding: 1px 5px;
            border-radius: 999px;
            font-weight: 800;
            box-shadow: 0 2px 5px rgba(219, 39, 119, 0.4);
          }

          /* Body ke niche padding taaki content bottom bar ke pichhe na chupe */
          body {
            padding-bottom: 85px !important;
          }
        }
      `}</style>
    </>
  );
};

export default AppMenu;