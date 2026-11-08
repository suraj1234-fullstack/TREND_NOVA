import React, { useState, useEffect } from 'react';

const CartModal = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const saved = JSON.parse(localStorage.getItem('trendnova_cart')) || [];
      setCartItems(saved);
    };
    loadCart();

    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  // Instant Quantity Plus / Minus Handler
  const handleQuantityChange = (id, delta) => {
    const currentCart = JSON.parse(localStorage.getItem('trendnova_cart')) || [];
    const updated = currentCart.map(item => {
      if ((item._id || item.id) === id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    
    localStorage.setItem('trendnova_cart', JSON.stringify(updated));
    setCartItems([...updated]);
    window.dispatchEvent(new Event('storage'));
  };

  // Instant Remove Item Handler
  const handleRemoveItem = (id) => {
    const currentCart = JSON.parse(localStorage.getItem('trendnova_cart')) || [];
    const updated = currentCart.filter(item => (item._id || item.id) !== id);
    
    localStorage.setItem('trendnova_cart', JSON.stringify(updated));
    setCartItems([...updated]);
    window.dispatchEvent(new Event('storage'));
  };

  // Clear Entire Cart Feature
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to empty your cart?")) {
      localStorage.removeItem('trendnova_cart');
      setCartItems([]);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div>
            <h2 className="cart-drawer-title">
              Trend<span>Nova</span> Cart
            </h2>
            <p className="cart-drawer-subtitle">{totalItemsCount} items in your bag</p>
          </div>
          <button type="button" className="cart-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Cart Body Content */}
        {cartItems.length > 0 ? (
          <div className="cart-drawer-content">
            
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item._id || item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                    
                    <div className="cart-item-controls">
                      <div className="qty-btn-group">
                        <button type="button" onClick={() => handleQuantityChange(item._id || item.id, -1)}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button type="button" onClick={() => handleQuantityChange(item._id || item.id, 1)}>+</button>
                      </div>

                      <button type="button" onClick={() => handleRemoveItem(item._id || item.id)} className="cart-item-delete-btn">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-utility-row">
              <button type="button" onClick={handleClearCart} className="clear-cart-btn">
                🗑️ Clear Entire Cart
              </button>
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-summary-row">
                <span>Subtotal Amount:</span>
                <span className="summary-amount">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row" style={{ fontSize: '13px', color: '#10b981', marginTop: '2px' }}>
                <span>Delivery Charges:</span>
                <span style={{ fontWeight: '600' }}>FREE 🚚</span>
              </div>
              
              <div className="cart-total-divider"></div>

              <div className="cart-summary-row" style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px', color: '#111827' }}>Total Payable:</span>
                <span style={{ fontWeight: '800', fontSize: '18px', color: '#059669' }}>₹{totalAmount.toLocaleString()}</span>
              </div>

              <button 
                type="button"
                onClick={() => {
                  alert('🎉 Order Placed Successfully! Thank you for shopping with TrendNova.');
                  localStorage.removeItem('trendnova_cart');
                  setCartItems([]);
                  window.dispatchEvent(new Event('storage'));
                  onClose();
                }}
                className="checkout-btn"
              >
                Proceed to Secure Checkout ⚡
              </button>
            </div>

          </div>
        ) : (
          <div className="cart-empty-state">
            <div style={{ fontSize: '42px', marginBottom: '10px' }}>🛒</div>
            <h3>Your Cart is Empty</h3>
            <p>Explore our latest collection and add items to your cart.</p>
            <button type="button" onClick={onClose} className="shop-now-btn">Start Shopping</button>
          </div>
        )}

      </div>

      {/* --- RESPONSIVE CSS STYLES (MOBILE & DESKTOP OPTIMIZED) --- */}
      <style>{`
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          z-index: 99999;
          display: flex;
          justify-content: flex-end;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.25s ease;
        }

        .cart-drawer-container {
          width: 420px;
          max-width: 100%;
          height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        .cart-drawer-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
        }

        .cart-drawer-title {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          color: #db2777;
        }
        .cart-drawer-title span {
          color: #1e293b;
        }

        .cart-drawer-subtitle {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }

        .cart-close-btn {
          background: #e2e8f0;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-item-card {
          display: flex;
          gap: 12px;
          padding: 10px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          align-items: center;
        }

        .cart-item-img {
          width: 55px;
          height: 55px;
          object-fit: contain;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 3px;
          flex-shrink: 0;
        }

        .cart-item-details {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          margin: 0 0 3px 0;
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-item-price {
          font-size: 14px;
          font-weight: 700;
          color: #059669;
        }

        .cart-item-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        .qty-btn-group {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          overflow: hidden;
        }

        .qty-btn-group button {
          background: #e2e8f0;
          border: none;
          width: 24px;
          height: 24px;
          font-weight: bold;
          cursor: pointer;
          font-size: 13px;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qty-btn-group span {
          padding: 0 10px;
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
        }

        .cart-item-delete-btn {
          background: none;
          border: none;
          color: #dc2626;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .cart-utility-row {
          margin-top: 12px;
          display: flex;
          justify-content: flex-end;
        }

        .clear-cart-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .cart-drawer-footer {
          margin-top: 15px;
          padding-top: 14px;
          border-top: 1px solid #e2e8f0;
          background: #fff;
        }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #475569;
          margin-bottom: 5px;
        }

        .summary-amount {
          font-weight: 700;
          color: #1e293b;
        }

        .cart-total-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 8px 0;
        }

        .checkout-btn {
          width: 100%;
          padding: 12px;
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
        }

        .cart-empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          color: #64748b;
        }

        .cart-empty-state h3 {
          margin: 0 0 4px 0;
          color: #1e293b;
          font-size: 17px;
        }

        .cart-empty-state p {
          font-size: 12px;
          margin-bottom: 16px;
        }

        .shop-now-btn {
          padding: 8px 16px;
          background: #2563EB;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        /* --- MOBILE RESPONSIVE MEDIA QUERY --- */
        @media (max-width: 480px) {
          .cart-drawer-container {
            width: 100% !important;
            height: 100vh;
            border-radius: 0;
          }
          .cart-drawer-header {
            padding: 14px 16px;
          }
          .cart-drawer-content {
            padding: 14px 16px;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CartModal;