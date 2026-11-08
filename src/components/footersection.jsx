import React, { useState, useEffect } from 'react';

const Footersection = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Scroll to Top Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="tn-footer">
      
      {/* Scroll to Top Floating Button */}
      {showScrollBtn && (
        <button 
          onClick={scrollToTop} 
          className="tn-scroll-btn"
          aria-label="Scroll to Top"
          title="Back to Top"
        >
          ↑
        </button>
      )}

      {/* 1. TRUST & GUARANTEE STRIP */}
      <div className="tn-trust-strip">
        <div className="tn-trust-container">
          <div className="tn-trust-item">
            <span className="tn-trust-icon"><i class="fa-solid fa-truck"></i></span>
            <div>
              <h4>FREE SHIPPING</h4>
              <p>On all orders above ₹799</p>
            </div>
          </div>

          <div className="tn-trust-item">
            <span className="tn-trust-icon"><i class="fa-solid fa-arrow-rotate-left"></i></span>
            <div>
              <h4>EASY 7-DAY RETURNS</h4>
              <p>Hassle-free replacement guarantee</p>
            </div>
          </div>

          <div className="tn-trust-item">
            <span className="tn-trust-icon"><i class="fa-solid fa-hand-holding-hand"></i></span>
            <div>
              <h4>100% HANDPICKED</h4>
              <p>Guaranteed authentic products</p>
            </div>
          </div>

          <div className="tn-trust-item">
            <span className="tn-trust-icon"><i class="fa-solid fa-user-shield"></i></span>
            <div>
              <h4>SECURE CHECKOUT</h4>
              <p>Razorpay Encrypted Payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="tn-main-footer">
        <div className="tn-footer-container">
          
          {/* Brand Info Column */}
          <div className="tn-footer-col brand-col">
            <h2 className="tn-brand-logo">Trend<span>Nova</span></h2>
            <p className="tn-brand-desc">
              TrendNova is your one-stop fashion and lifestyle destination. Experience the latest high-street trends, daily essentials, and curated collections at unbeatable prices.
            </p>
            <div className="tn-social-box">
              <span>Follow Us:</span>
              <div className="tn-social-links">
                <a href="#facebook" aria-label="Facebook">FB</a>
                <a href="#instagram" aria-label="Instagram">IG</a>
                <a href="#twitter" aria-label="Twitter">TW</a>
                <a href="#youtube" aria-label="YouTube">YT</a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="tn-footer-col">
            <h3>ONLINE SHOPPING</h3>
            <ul>
              <li><a href="#men">Men's Wear</a></li>
              <li><a href="#women">Women's Fashion</a></li>
              <li><a href="#footwear">Footwear & Shoes</a></li>
              <li><a href="#watches">Watches & Accessories</a></li>
              <li><a href="#electronics">Laptops & Tech</a></li>
              <li><a href="#deals">Special Discounts</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="tn-footer-col">
            <h3>CUSTOMER POLICIES</h3>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ & Help Center</a></li>
              <li><a href="#track">Track Order</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact Info */}
          <div className="tn-footer-col">
            <h3>KEEP IN TOUCH</h3>
            <p className="tn-news-text">Subscribe for exclusive offers and daily style updates!</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("🎉 Thanks for subscribing to TrendNova!"); }} className="tn-news-form">
              <input type="email" placeholder="Enter Email Address" required />
              <button type="submit">SUBSCRIBE</button>
            </form>
            <div className="tn-support-info">
              <p><strong>Customer Support:</strong> support@trendnova.com</p>
              <p><strong>Mon - Sat:</strong> 10:00 AM - 7:00 PM</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. POPULAR SEARCHES (Clean Pill Tags) */}
      <div className="tn-seo-directory">
        <div className="tn-seo-container">
          <h4>POPULAR SEARCHES</h4>
          <div className="tn-tags-wrapper">
            <span>Oversized T-Shirts</span> •
            <span>Classic Denim</span> •
            <span>Smartwatches</span> •
            <span>Gaming Laptops</span> •
            <span>Casual Sneakers</span> •
            <span>Leather Boots</span> •
            <span>Formal Shirts</span> •
            <span>Women Kurtis</span> •
            <span>Trackpants</span> •
            <span>Sunglasses</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM COPYRIGHT & PAYMENT BADGES */}
      <div className="tn-bottom-bar">
        <div className="tn-bottom-container">
          <p>© 2026 <strong>TrendNova Retail Pvt. Ltd.</strong> All Rights Reserved.</p>
          <div className="tn-payment-badges">
            <span>100% Safe Payments:</span>
            <span className="tn-pay-tag">Razorpay</span>
            <span className="tn-pay-tag">UPI</span>
            <span className="tn-pay-tag">Cards</span>
            <span className="tn-pay-tag">Net Banking</span>
          </div>
        </div>
      </div>

      {/* --- STYLES (ELEGANT DARK E-COMMERCE THEME) --- */}
      <style>{`
        .tn-footer {
          background-color: #0f172a;
          color: #94a3b8;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          margin-top: 60px;
          border-top: 3px solid #db2777;
          position: relative;
        }

        .tn-scroll-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #db2777;
          color: #ffffff;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(219, 39, 119, 0.4);
          z-index: 9999;
          transition: transform 0.2s, background 0.2s;
        }
        .tn-scroll-btn:hover {
          background: #be185d;
          transform: translateY(-3px);
        }

        .tn-trust-strip {
          background-color: #1e293b;
          border-bottom: 1px solid #334155;
          padding: 24px 20px;
        }
        .tn-trust-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .tn-trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .tn-trust-icon {
          font-size: 28px;
        }
        .tn-trust-item h4 {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: 0.5px;
        }
        .tn-trust-item p {
          margin: 3px 0 0 0;
          font-size: 12px;
          color: #94a3b8;
        }

        .tn-main-footer {
          padding: 45px 20px 35px 20px;
        }
        .tn-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 35px;
        }

        .tn-footer-col h3 {
          font-size: 13px;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: 1px;
          margin: 0 0 16px 0;
        }
        .tn-footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tn-footer-col ul li {
          margin-bottom: 10px;
        }
        .tn-footer-col ul li a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }
        .tn-footer-col ul li a:hover {
          color: #db2777;
        }

        .brand-col .tn-brand-logo {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        }
        .brand-col .tn-brand-logo span {
          color: #db2777;
        }
        .tn-brand-desc {
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 18px;
          color: #94a3b8;
        }

        .tn-social-box {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #cbd5e1;
        }
        .tn-social-links {
          display: flex;
          gap: 8px;
        }
        .tn-social-links a {
          background: #1e293b;
          color: #38bdf8;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          border: 1px solid #334155;
          transition: background 0.2s;
        }
        .tn-social-links a:hover {
          background: #db2777;
          color: #fff;
          border-color: #db2777;
        }

        .tn-news-text {
          font-size: 13px;
          margin: 0 0 12px 0;
        }
        .tn-news-form {
          display: flex;
          margin-bottom: 16px;
        }
        .tn-news-form input {
          flex: 1;
          padding: 10px 12px;
          font-size: 13px;
          border: 1px solid #334155;
          border-radius: 6px 0 0 6px;
          outline: none;
          background: #1e293b;
          color: #fff;
          min-width: 0;
        }
        .tn-news-form button {
          background: #db2777;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 0 6px 6px 0;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
        }
        .tn-news-form button:hover {
          background: #be185d;
        }

        .tn-support-info p {
          margin: 4px 0;
          font-size: 12px;
          color: #cbd5e1;
        }

        .tn-seo-directory {
          background: #090d16;
          padding: 20px;
          border-top: 1px solid #1e293b;
        }
        .tn-seo-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .tn-seo-container h4 {
          margin: 0 0 8px 0;
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.5px;
        }
        .tn-tags-wrapper {
          font-size: 12px;
          color: #64748b;
          line-height: 1.8;
        }
        .tn-tags-wrapper span {
          color: #94a3b8;
          margin: 0 6px;
          cursor: pointer;
        }
        .tn-tags-wrapper span:hover {
          color: #db2777;
        }

        .tn-bottom-bar {
          background: #04070d;
          padding: 18px 20px;
          border-top: 1px solid #1e293b;
          font-size: 12px;
        }
        .tn-bottom-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .tn-bottom-container p {
          margin: 0;
          color: #64748b;
        }
        .tn-bottom-container p strong {
          color: #94a3b8;
        }

        .tn-payment-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
        }
        .tn-pay-tag {
          background: #1e293b;
          color: #cbd5e1;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid #334155;
        }

        @media (max-width: 768px) {
          .tn-bottom-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .tn-scroll-btn {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footersection;