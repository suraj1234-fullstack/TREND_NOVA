import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);


  
  const [couponMessage, setCouponMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Page khulte hi top par le aaye
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

  // Apply Coupon Code Logic
  // ✅ Dynamically checks coupons created from Admin Dashboard
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const enteredCode = couponCode.trim().toUpperCase();
    
    // Fetch coupons saved by Admin in localStorage
    const savedAdminCoupons = JSON.parse(localStorage.getItem('trendnova_admin_coupons')) || [];

    const matchedCoupon = savedAdminCoupons.find(c => c.code === enteredCode);

    if (matchedCoupon) {
      setDiscountPercent(matchedCoupon.discount);
      setCouponMessage(`Success! Flat ${matchedCoupon.discount}% OFF applied 🎉`);
    } else {
      setDiscountPercent(0);
      setCouponMessage('Invalid Coupon Code ❌');
    }
  };
  // const handleApplyCoupon = (e) => {
  //   e.preventDefault();
  //   if (couponCode.trim().toUpperCase() === 'TREND30') {
  //     setDiscountPercent(30);
  //     setCouponMessage('Success! Flat 10% OFF applied ');
  //   } else {
  //     setDiscountPercent(0);
  //     setCouponMessage('Invalid Coupon Code ');
  //   }
  // };

  // Calculations
  const subtotalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discountAmount = Math.round((subtotalAmount * discountPercent) / 100);
  const finalPayableAmount = subtotalAmount - discountAmount;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // --- RAZORPAY SECURE PAYMENT INTEGRATION FROM CART ---
  const handleCartPayment = async () => {
    if (cartItems.length === 0) return;

    try {
      const response = await fetch('https://trend-nova-product-api-2.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalPayableAmount })
      });
      const order = await response.json();

      if (!order.id) {
        alert("Order create karne mein error aaya!");
        return;
      }

      const options = {
        key: "rzp_test_TxcEh6GfO2ErwY", 
        amount: order.amount,
        currency: "INR",
        name: "TrendNova Store",
        description: `Cart Checkout (${totalItemsCount} items)`,
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
          localStorage.removeItem('trendnova_cart');
          setCartItems([]);
          window.dispatchEvent(new Event('storage'));
          if (onClose) onClose();
          navigate('/');
        },
        prefill: {
          name: "Suraj Kumar",
          email: "suraj@gmail.com",
          contact: "9999999999"
        },
        theme: {
          color: "#db2777"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiate nahi ho payi!");
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        
        {/* Page Header */}
        <div className="cart-page-header">
          <div>
            <h1 className="cart-page-title">
              My Shopping Bag <span>({totalItemsCount} items)</span>
            </h1>
            <p className="cart-page-subtitle">Review your selected items before proceeding to secure checkout</p>
          </div>
          <button 
            type="button" 
            className="cart-back-btn" 
            onClick={() => {
              if (onClose) onClose();
              else navigate(-1);
            }}
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Continue Shopping
          </button>
        </div>

        {/* Cart Body Content */}
        {cartItems.length > 0 ? (
          <div className="cart-page-grid">
            
            {/* Left: Products List */}
            <div className="cart-products-section">
              <div className="cart-items-container">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="cart-product-card">
                    <img src={item.image} alt={item.name} className="cart-product-img" />
                    
                    <div className="cart-product-info">
                      <h3 className="cart-product-name">{item.name}</h3>
                      <div className="cart-price-row">
                        <span className="cart-product-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                        <span className="cart-item-unit-price">({item.price} each)</span>
                      </div>
                      
                      <div className="cart-product-actions">
                        <div className="qty-selector">
                          <button type="button" onClick={() => handleQuantityChange(item._id || item.id, -1)}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button type="button" onClick={() => handleQuantityChange(item._id || item.id, 1)}>+</button>
                        </div>

                        <button type="button" onClick={() => handleRemoveItem(item._id || item.id)} className="cart-remove-link">
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer-actions">
                <button type="button" onClick={handleClearCart} className="clear-all-btn">
                  🗑️ Clear Entire Bag
                </button>
              </div>
            </div>

            {/* Right: Price Summary & Coupon */}
            <div className="cart-checkout-section">
              
              {/* Coupon Box */}
              <div className="promo-box">
                <h4>Enter your Promo Code.</h4>
                
                <form onSubmit={handleApplyCoupon} className="promo-form">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon " 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="promo-input"
                  />
                  <button type="submit" className="promo-btn">Apply</button>
                </form>
                {couponMessage && <p className={`promo-feedback ${discountPercent > 0 ? 'success' : 'error'}`}>{couponMessage}</p>}
              </div>

              {/* Bill Details */}
              <div className="bill-details-card">
                <h3>Order Summary</h3>
                
                <div className="bill-row">
                  <span>Bag Subtotal</span>
                  <span>₹{subtotalAmount.toLocaleString()}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="bill-row discount-highlight">
                    <span>Promo Discount ({discountPercent}%)</span>
                    <span>- ₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="bill-row">
                  <span>Delivery Charges</span>
                  <span className="free-text">FREE</span>
                </div>

                <div className="bill-divider"></div>

                <div className="bill-row total-payable-row">
                  <span>Total Amount</span>
                  <span className="final-amount">₹{finalPayableAmount.toLocaleString()}</span>
                </div>

                <button 
                  type="button"
                  onClick={handleCartPayment}
                  className="secure-pay-btn"
                >
                  Proceed to Secure Payment 
                </button>

                <div className="trust-badge-row">
                  <span>🛡️ 100% Safe & Secure Payments via Razorpay</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="empty-cart-container">
            <div className="empty-cart-icon"><i class="fa-solid fa-bag-shopping"></i></div>
            <h2>Your Shopping Bag is Empty</h2>
            <p>Looks like you haven't added anything to your bag yet.</p>
            <button 
              type="button" 
              onClick={() => {
                if (onClose) onClose();
                navigate('/');
              }} 
              className="explore-btn"
            >
              Explore Products
            </button>
          </div>
        )}

      </div>

      {/* --- 100% MOBILE-FRIENDLY RESPONSIVE CSS --- */}
      <style>{`
        .cart-page-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #f8fafc;
          z-index: 999999;
          overflow-y: auto;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
          -webkit-overflow-scrolling: touch;
        }

        .cart-page-container {
          max-width: 1200px;
          margin: 30px auto;
          padding: 0 16px;
          box-sizing: border-box;
        }

        .cart-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 14px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cart-page-title {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
        }
        .cart-page-title span {
          color: #db2777;
          font-size: 18px;
        }

        .cart-page-subtitle {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #64748b;
        }

        .cart-back-btn {
          background: #fff;
          border: 1px solid #cbd5e1;
          padding: 8px 14px;
          border-radius: 8px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
        }
        .cart-back-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        .cart-page-grid {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .cart-products-section {
          flex: 1.5;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }

        .cart-items-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 65vh;
          overflow-y: auto;
          padding-right: 4px;
        }

        .cart-product-card {
          display: flex;
          gap: 16px;
          background: #fff;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          align-items: center;
          box-sizing: border-box;
        }

        .cart-product-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 4px;
          flex-shrink: 0;
        }

        .cart-product-info {
          flex: 1;
          min-width: 0;
        }

        .cart-product-name {
          margin: 0 0 4px 0;
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .cart-product-price {
          font-size: 16px;
          font-weight: 800;
          color: #059669;
        }

        .cart-item-unit-price {
          font-size: 11px;
          color: #94a3b8;
        }

        .cart-product-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .qty-selector {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          overflow: hidden;
        }

        .qty-selector button {
          background: #e2e8f0;
          border: none;
          width: 28px;
          height: 28px;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qty-selector span {
          padding: 0 12px;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }

        .cart-remove-link {
          background: none;
          border: none;
          color: #dc2626;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .cart-remove-link:hover {
          text-decoration: underline;
        }

        .cart-footer-actions {
          display: flex;
          justify-content: flex-end;
        }

        .clear-all-btn {
          background: none;
          border: none;
          color: #64748b;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }
        .clear-all-btn:hover {
          color: #dc2626;
        }

        .cart-checkout-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 20px;
          min-width: 0;
        }

        .promo-box {
          background: #fff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .promo-box h4 {
          margin: 0 0 20px 10px;
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
        }

        .promo-hint {
          margin: 0 0 10px 0;
          font-size: 11px;
          color: #64748b;
        }

        .promo-form {
          display: flex;
          gap: 8px;
        }

        .promo-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
          min-width: 0;
        }

        .promo-btn {
          padding: 8px 16px;
          background: #2563EB;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
          flex-shrink: 0;
        }

        .promo-feedback {
          margin: 6px 0 0 0;
          font-size: 11px;
          font-weight: 600;
        }
        .promo-feedback.success { color: #059669; }
        .promo-feedback.error { color: #dc2626; }

        .bill-details-card {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .bill-details-card h3 {
          margin: 0 0 14px 0;
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 8px;
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #475569;
          margin-bottom: 10px;
        }

        .discount-highlight {
          color: #059669;
          font-weight: 600;
        }

        .free-text {
          color: #059669;
          font-weight: 700;
        }

        .bill-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 14px 0;
        }

        .total-payable-row {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .final-amount {
          color: #1e9141;
          font-size: 20px;
        }

        .secure-pay-btn {
          width: 100%;
          padding: 14px;
          background: #2a27db;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(219, 39, 119, 0.35);
          transition: background 0.2s;
        }
        .secure-pay-btn:hover {
          background: #be185d;
        }

        .trust-badge-row {
          text-align: center;
          margin-top: 12px;
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }

        .empty-cart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 16px;
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .empty-cart-icon {
          font-size: 56px;
          margin-bottom: 14px;
        }

        .empty-cart-container h2 {
          margin: 0 0 6px 0;
          font-size: 22px;
          font-weight: 800;
          color: #1e293b;
        }

        .empty-cart-container p {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .explore-btn {
          padding: 10px 20px;
          background: #2563EB;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }

        /* --- EXTRA MOBILE OPTIMIZED MEDIA QUERIES --- */
        @media (max-width: 992px) {
          .cart-page-grid {
            flex-direction: column;
          }
          .cart-checkout-section {
            position: static;
            width: 100%;
          }
          .cart-items-container {
            max-height: none;
          }
          .cart-page-container {
            margin: 20px auto;
          }
        }

        @media (max-width: 480px) {
          .cart-product-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .cart-product-img {
            width: 100%;
            height: 120px;
          }
          .cart-product-actions {
            width: 100%;
          }
          .cart-page-title {
            font-size: 20px;
          }
          .cart-page-title span {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartModal;