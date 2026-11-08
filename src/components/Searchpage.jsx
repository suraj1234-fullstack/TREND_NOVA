import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CartModal from './cartmodel';

const SearchPage = () => {
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Cart & Navbar Live Count State (LocalStorage Sync) ---
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    
    const savedCart = JSON.parse(localStorage.getItem('trendnova_cart')) || [];
    setCartItems(savedCart);
  }, []);

  // --- Auto Scroll to Top on Page Load or Query Change ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Add to Cart Function (Updates LocalStorage & Cart Badge)
  const handleAddToCart = (product) => {
    let updatedCart = JSON.parse(localStorage.getItem('trendnova_cart')) || [];
    
    // Check karo ki kya yeh product pehle se cart mein hai ya nahi (_id ya id se)
    const existingIndex = updatedCart.findIndex(item => (item._id || item.id) === (product._id || product.id));

    if (existingIndex > -1) {
      // Agar pehle se hai, toh naya item add karne ki jagah bas quantity 1 badha do
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      // Agar pehle se nahi hai, toh pehli baar quantity 1 ke sath add karo
      updatedCart.push({ ...product, quantity: 1 });
    }

    // LocalStorage mein save kar do
    localStorage.setItem('trendnova_cart', JSON.stringify(updatedCart));
    
  };
  // const handleAddToCart = (product) => {
  //   let updatedCart = [...cartItems];
  //   const existingIndex = updatedCart.findIndex(item => (item._id || item.id) === (product._id || product.id));

  //   if (existingIndex > -1) {
  //     updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
  //   } else {
  //     updatedCart.push({ ...product, quantity: 1 });
  //   }

  //   setCartItems(updatedCart);
  //   localStorage.setItem('trendnova_cart', JSON.stringify(updatedCart));
  //   alert(`🛒 "${product.name}" added to Cart successfully!`);
  // };

  // --- Selected Product State for Detail View (PDP) ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    { user: 'Aman Sharma', text: 'Amazing quality! Highly recommended.' },
    { user: 'Priya Verma', text: 'Fast delivery and exact same product as shown.' }
  ]);

  // --- Dynamic Filter States ---
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState('All');
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState('All');
  const [selectedLifestyle, setSelectedLifestyle] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Mobile drawer filter toggle state
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const url = `https://trend-nova-product-api-2.onrender.com/api/products/search?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const enhancedData = data.map((p, idx) => {
          const lowerName = (p.name || '').toLowerCase();
          const lowerCat = (p.category || '').toLowerCase();

          return {
            ...p,
            discount: p.discount || (15 + (idx * 7) % 55),
            color: p.color || ['Black', 'Blue', 'White', 'Red', 'Grey', 'Brown'][idx % 6],
            deliveryDays: p.deliveryDays || (idx % 2 === 0 ? 'In 2 Days' : '3-5 Days'),
            size: p.size || (
              lowerCat.includes('footwear') || lowerName.includes('shoe') 
                ? ['UK 7', 'UK 8', 'UK 9', 'UK 10'][idx % 4] 
                : ['S', 'M', 'L', 'XL', 'Free Size'][idx % 5]
            ),
            material: p.material || (
              lowerName.includes('watch') ? 'Stainless Steel' :
              lowerName.includes('shoe') ? 'Leather / Mesh' :
              lowerName.includes('laptop') || lowerName.includes('mobile') ? 'Aluminium / Glass' :
              'Pure Cotton'
            ),
            feature: p.feature || (
              lowerName.includes('watch') ? 'Waterproof & Smart Sensors' :
              lowerName.includes('mobile') || lowerName.includes('laptop') ? 'Fast Charging & 5G' :
              'Breathable & Durable'
            ),
            lifestyle: p.lifestyle || ['Casual', 'Formal', 'Sports', 'Party Wear'][idx % 4],
            season: p.season || ['All Season', 'Summer Special', 'Winter Wear'][idx % 3],
            highlights: p.highlights || ['Top Rated', 'Free Delivery', 'Assured Quality'][idx % 3]
          };
        });

        setProducts(enhancedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  useEffect(() => {
    setSelectedSubCategory('All');
    setMaxPrice(100000);
    setMinRating(0);
    setSelectedColor('All');
    setMinDiscount(0);
    setSelectedDelivery('All');
    setSelectedSize('All');
    setSelectedMaterial('All');
    setSelectedFeature('All');
    setSelectedLifestyle('All');
    setSelectedSeason('All');
    setSelectedProduct(null); // Reset detail view on new search
  }, [query]);

  const dynamicSubCategories = useMemo(() => {
    if (!products.length) return [];
    const subCats = new Set();
    products.forEach(p => {
      if (p.subCategory) subCats.add(p.subCategory);
      if (p.category) subCats.add(p.category);
    });
    return ['All', ...Array.from(subCats)];
  }, [products]);

  const dynamicMaterials = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.material).filter(Boolean)))], [products]);
  const dynamicFeatures = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.feature).filter(Boolean)))], [products]);
  const dynamicSizes = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.size).filter(Boolean)))], [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedSubCategory !== 'All') {
      list = list.filter(p => 
        p.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase() || 
        p.category?.toLowerCase() === selectedSubCategory.toLowerCase()
      );
    }

    list = list.filter(p => (p.price || 0) <= maxPrice);

    if (minRating > 0) {
      list = list.filter(p => (p.rating || 0) >= minRating);
    }

    if (selectedColor !== 'All') {
      list = list.filter(p => p.color?.toLowerCase() === selectedColor.toLowerCase());
    }

    if (minDiscount > 0) {
      list = list.filter(p => (p.discount || 0) >= minDiscount);
    }

    if (selectedDelivery !== 'All') {
      list = list.filter(p => p.deliveryDays === selectedDelivery);
    }

    if (selectedSize !== 'All') {
      list = list.filter(p => p.size === selectedSize);
    }

    if (selectedMaterial !== 'All') {
      list = list.filter(p => p.material === selectedMaterial);
    }

    if (selectedFeature !== 'All') {
      list = list.filter(p => p.feature === selectedFeature);
    }

    if (selectedLifestyle !== 'All') {
      list = list.filter(p => p.lifestyle === selectedLifestyle);
    }

    if (selectedSeason !== 'All') {
      list = list.filter(p => p.season === selectedSeason);
    }

    if (sortBy === 'low-high') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'high-low') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return list;
  }, [products, selectedSubCategory, maxPrice, minRating, selectedColor, minDiscount, selectedDelivery, selectedSize, selectedMaterial, selectedFeature, selectedLifestyle, selectedSeason, sortBy]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    setCommentsList([...commentsList, { user: 'You (Customer)', text: userComment }]);
    setUserComment('');
  };
  // --- RAZORPAY BUY NOW PAYMENT FUNCTION ---
  const handleBuyNow = async (product) => {
    try {
      // 1. Backend se Order ID mangwao
      const response = await fetch('https://trend-nova-product-api-2.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: product.price })
      });
      const order = await response.json();

      if (!order.id) {
        alert("Order create karne mein error aaya!");
        return;
      }

      // 2. Razorpay Options Set Karo
      const options = {
        key: "rzp_test_TxcEh6GfO2ErwY", // Teri Test Key ID
        amount: order.amount,
        currency: "INR",
        name: "TrendNova Store",
        description: `Purchase of ${product.name}`,
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
          console.log("Payment Response:", response);
          // Payment successful hone par chahe toh cart mein bhi add karke modal khol sakta hai
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
    <div className="search-page-container">
      
      {/* --- YOUR EXACT NAVBAR CART SNIPPET WITH DYNAMIC LIVE COUNT --- */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <span 
          onClick={() => setShowCartModal(true)} 
          className="action-item cart-wrapper" 
          title="View Cart" 
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', background: '#fff', padding: '8px 14px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="cart-badge" style={{ marginLeft: '6px', fontWeight: 'bold', color: '#db2777' }}>
            {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
          </span>
        </span>
      </div>

      {/* --- CART MODAL POPUP (AMAZON/FLIPKART STYLE) --- */}
      {showCartModal && (
        <CartModal 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
          onClose={() => setShowCartModal(false)} 
        />
      )}

      {/* --- PERFECTLY CENTERED & RESPONSIVE TRENDNOVA LOADER --- */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-brand">
            <span style={{ color: '#111827' }}>Trend</span>
            <span style={{ color: '#db2777' }}>Nova</span>
          </div>
        </div>
      )}

      {/* --- PROFESSIONAL PRODUCT DETAIL VIEW (PDP) IF CLICKED --- */}
      {selectedProduct ? (
        <div className="pdp-container">
          <button 
            className="back-to-search-btn"
            onClick={() => setSelectedProduct(null)}
          >
            ← Back to Search Results
          </button>

          <div className="pdp-grid">
            {/* Left: Images Section with Thumbnails */}
            <div className="pdp-image-section">
              <div className="pdp-thumbnails">
                {(selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images : [selectedProduct.image]).map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="" 
                    className={`thumb-img ${activeImageIndex === idx ? 'active-thumb' : ''}`}
                    onMouseEnter={() => setActiveImageIndex(idx)}
                    onClick={() => setActiveImageIndex(idx)}
                  />
                ))}
              </div>
              <div className="pdp-main-image-box">
                <img 
                  src={(selectedProduct.images && selectedProduct.images[activeImageIndex]) || selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="pdp-main-img"
                />
              </div>
            </div>

            {/* Right: Info, Price, Add to Cart & Buy Now */}
            <div className="pdp-info-section">
              <h1 className="pdp-product-title">{selectedProduct.name}</h1>
              
              <div className="pdp-rating-row">
                <span style={{ color: '#105099' }}>{'★'.repeat(Math.floor(selectedProduct.rating || 4))}</span>
                <span className="pdp-rating-count">{selectedProduct.rating || '4.3'} Rating & Verified Reviews</span>
              </div>

              <div className="pdp-price-box">
                <span className="pdp-current-price">₹{selectedProduct.price.toLocaleString()}</span>
                <span className="pdp-original-price">₹{Math.round(selectedProduct.price * 1.45).toLocaleString()}</span>
                <span className="pdp-discount-tag">{selectedProduct.discount}% OFF</span>
              </div>

              <div className="pdp-highlights-box">
                <p><strong>Category:</strong> {selectedProduct.category} / {selectedProduct.subCategory}</p>
                <p><strong>Material / Build:</strong> {selectedProduct.material}</p>
                <p><strong>Delivery:</strong> 🚚 {selectedProduct.deliveryDays} Delivery Available</p>
              </div>

              {/* Action Buttons */}
              <div className="pdp-actions-row">
                <button 
                  className="pdp-add-cart-btn"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
               <button 
  className="pdp-buy-now-btn"
  onClick={() => handleBuyNow(selectedProduct)}
>
  Buy Now
</button>
              </div>
            </div>
          </div>


          

          {/* --- CUSTOMER COMMENTS & REVIEWS SECTION --- */}
          <div className="pdp-comments-section">
            <h3>Customer Comments & Reviews</h3>
            
            <form onSubmit={handleAddComment} className="comment-form">
              <input 
                type="text" 
                placeholder="Write your review or comment about this product..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="comment-input"
              />
              <button type="submit" className="comment-submit-btn">Post Comment</button>
            </form>

            <div className="comments-list">
              {commentsList.map((c, i) => (
                <div key={i} className="comment-card">
                  <strong>👤 {c.user}</strong>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Top Header & Search Status */}
          <div className="top-header-banner">
            <div>
              <h2 className="search-title">Search Results for "{query}"</h2>
              <p className="search-count">
                Total <strong style={{ color: '#2563EB' }}>{filteredProducts.length}</strong> products found matching your search.
              </p>
            </div>
            
            <div className="sort-filter-wrapper">
              <button 
                className="mobile-filter-btn"
                onClick={() => setShowFiltersMobile(true)}
              >
                ⚙️ Filters
              </button>

              <div className="sort-box">
                <label className="sort-label">Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="rating">Customer Review Rating</option>
                  <option value="discount">Biggest Discount %</option>
                </select>
              </div>
            </div>
          </div>

          <div className="main-content-layout">
            
            {/* --- RESPONSIVE SIDEBAR FILTERS --- */}
            <div className={`sidebar-filters ${showFiltersMobile ? 'mobile-active' : ''}`}>
              <div className="sidebar-header">
                <h3>Filter Results</h3>
                <button 
                  className="close-filter-btn"
                  onClick={() => setShowFiltersMobile(false)}
                >
                  ✕
                </button>
              </div>

              {/* Dynamic Category / Type */}
              {dynamicSubCategories.length > 1 && (
                <div className="filter-group">
                  <h4>Category & Type</h4>
                  {dynamicSubCategories.map((subCat) => (
                    <div key={subCat} className="filter-option">
                      <label>
                        <input 
                          type="radio" 
                          name="subCategory" 
                          checked={selectedSubCategory === subCat} 
                          onChange={() => setSelectedSubCategory(subCat)} 
                        />
                        {subCat}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery Day Filter */}
              <div className="filter-group">
                <h4>Delivery Time</h4>
                {['All', 'In 2 Days', '3-5 Days'].map((del) => (
                  <div key={del} className="filter-option">
                    <label>
                      <input 
                        type="radio" 
                        name="delivery" 
                        checked={selectedDelivery === del} 
                        onChange={() => setSelectedDelivery(del)} 
                      />
                      {del === 'In 2 Days' ? '⚡ Get it in 2 Days' : del}
                    </label>
                  </div>
                ))}
              </div>

              {/* Size Filter */}
              {dynamicSizes.length > 1 && (
                <div className="filter-group">
                  <h4>Size / Dimension</h4>
                  <div className="size-chips-wrapper">
                    {dynamicSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`size-chip ${selectedSize === sz ? 'active' : ''}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material Filter */}
              {dynamicMaterials.length > 1 && (
                <div className="filter-group">
                  <h4>Material</h4>
                  {dynamicMaterials.map((mat) => (
                    <div key={mat} className="filter-option">
                      <label>
                        <input 
                          type="radio" 
                          name="material" 
                          checked={selectedMaterial === mat} 
                          onChange={() => setSelectedMaterial(mat)} 
                        />
                        {mat}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Range */}
              <div className="filter-group">
                <h4>Max Price: ₹{maxPrice.toLocaleString()}</h4>
                <input 
                  type="range" 
                  min="200" 
                  max="100000" 
                  step="500" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))} 
                  className="price-range-input"
                />
                <div className="price-range-labels">
                  <span>₹200</span>
                  <span>₹1,00,000+</span>
                </div>
              </div>

              {/* Customer Rating */}
              <div className="filter-group">
                <h4>Customer Rating</h4>
                {[4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="filter-option">
                    <label>
                      <input 
                        type="radio" 
                        name="rating" 
                        checked={minRating === stars} 
                        onChange={() => setMinRating(stars)} 
                      />
                      <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>{'★'.repeat(stars)}{'☆'.repeat(5-stars)}</span> & up
                    </label>
                  </div>
                ))}
              </div>

              {/* Discount Filter */}
              <div className="filter-group">
                <h4>Discount Range</h4>
                {[10, 25, 40, 50].map((disc) => (
                  <div key={disc} className="filter-option">
                    <label>
                      <input 
                        type="radio" 
                        name="discount" 
                        checked={minDiscount === disc} 
                        onChange={() => setMinDiscount(disc)} 
                      />
                      {disc}% Off or more
                    </label>
                  </div>
                ))}
              </div>

              {/* Special Feature Filter */}
              {dynamicFeatures.length > 1 && (
                <div className="filter-group">
                  <h4>Special Feature</h4>
                  {dynamicFeatures.map((ft) => (
                    <div key={ft} className="filter-option">
                      <label>
                        <input 
                          type="radio" 
                          name="feature" 
                          checked={selectedFeature === ft} 
                          onChange={() => setSelectedFeature(ft)} 
                        />
                        {ft}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Lifestyle & Purpose */}
              <div className="filter-group">
                <h4>Lifestyle & Purpose</h4>
                {['All', 'Casual', 'Formal', 'Sports', 'Party Wear'].map((ls) => (
                  <div key={ls} className="filter-option">
                    <label>
                      <input 
                        type="radio" 
                        name="lifestyle" 
                        checked={selectedLifestyle === ls} 
                        onChange={() => setSelectedLifestyle(ls)} 
                      />
                      {ls}
                    </label>
                  </div>
                ))}
              </div>

              {/* Season Filter */}
              <div className="filter-group" style={{ borderBottom: 'none' }}>
                <h4>Season</h4>
                {['All', 'All Season', 'Summer Special', 'Winter Wear'].map((sn) => (
                  <div key={sn} className="filter-option">
                    <label>
                      <input 
                        type="radio" 
                        name="season" 
                        checked={selectedSeason === sn} 
                        onChange={() => setSelectedSeason(sn)} 
                      />
                      {sn}
                    </label>
                  </div>
                ))}
              </div>

            </div>

            {/* --- PRODUCTS DISPLAY GRID (CLICKABLE TO OPEN PDP) --- */}
            <div className="products-grid-area">
              <div className="products-responsive-grid">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div 
                      key={product._id || product.id} 
                      className="product-card"
                      onClick={() => {
                        setSelectedProduct(product);
                        setActiveImageIndex(0);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <div className="product-image-container">
                          <img 
                            src={product.image || 'https://via.placeholder.com/150'} 
                            alt={product.name} 
                            className="product-img" 
                          />
                          <span className="discount-badge">
                            {product.discount}% OFF
                          </span>
                        </div>

                        <h3 className="product-title">
                          {product.name}
                        </h3>

                        <div className="product-tags">
                          <span className="tag-material">
                            {product.material}
                          </span>
                          <span className="tag-size">
                            Size: {product.size}
                          </span>
                        </div>

                        <div className="product-rating-box">
                          <span style={{ color: '#F59E0B', fontSize: '14px' }}>
                            {'★'.repeat(Math.floor(product.rating || 4))}
                          </span>
                          <span className="rating-text">{product.rating || '4.2'}</span>
                        </div>
                      </div>

                      <div className="product-footer-info">
                        <div className="price-row">
                          <span className="current-price">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="original-price">
                            ₹{Math.round(product.price * 1.45).toLocaleString()}
                          </span>
                        </div>
                        <p className="delivery-info">
                          🚚 {product.deliveryDays} Delivery
                        </p>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="no-products-found">
                    <p>No products found for "{query}" with these filters.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </>
      )}

      {/* --- RESPONSIVE CSS STYLES --- */}
      <style>{`
        .search-page-container {
          padding: 20px;
          max-width: 1440px;
          margin: 80px auto 20px auto;
          font-family: "Inter", "Segoe UI", Roboto, sans-serif;
          color: #0F1111;
          background-color: #F3F4F6;
          min-height: 80vh;
          box-sizing: border-box;
          position: relative;
        }

        /* PDP Styling */
        .pdp-container {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .back-to-search-btn {
          background: #2563EB;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .pdp-grid {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .pdp-image-section {
          display: flex;
          gap: 16px;
          flex: 1;
          min-width: 320px;
        }

        .pdp-thumbnails {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .thumb-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #D1D5DB;
          cursor: pointer;
        }

        .thumb-img.active-thumb {
          border: 2px solid #db2777;
        }

        .pdp-main-image-box {
          flex: 1;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 400px;
        }

        .pdp-main-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .pdp-info-section {
          flex: 1;
          min-width: 300px;
        }

        .pdp-product-title {
          font-size: 26px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }

        .pdp-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .pdp-rating-count {
          font-size: 13px;
          color: #4B5563;
        }

        .pdp-price-box {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 15px;
        }

        .pdp-current-price {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
        }

        .pdp-original-price {
          font-size: 16px;
          color: #9CA3AF;
          text-decoration: line-through;
        }

        .pdp-discount-tag {
          background: #EF4444;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .pdp-highlights-box {
          font-size: 14px;
          color: #374151;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .pdp-actions-row {
          display: flex;
          gap: 15px;
        }

        .pdp-add-cart-btn {
          flex: 1;
          background: #db2777;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .pdp-buy-now-btn {
          flex: 1;
          background: #1e3c9e;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .pdp-comments-section {
          margin-top: 40px;
          border-top: 2px solid #E5E7EB;
          padding-top: 25px;
        }

        .pdp-comments-section h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .comment-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .comment-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          outline: none;
        }

        .comment-submit-btn {
          background: #2563EB;
          color: #fff;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .comment-card {
          background: #F9FAFB;
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid #E5E7EB;
        }

        .comment-card p {
          margin: 4px 0 0 0;
          color: #4B5563;
          font-size: 14px;
        }

        /* PERFECT RESPONSIVE FULLSCREEN LOADER */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 99999;
          backdrop-filter: blur(5px);
          box-sizing: border-box;
          padding: 20px;
        }

        .loading-brand {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: 0.5px;
          animation: pulse 1.2s infinite ease-in-out;
          margin-bottom: 8px;
        }

        .top-header-banner {
          background: #fff;
          padding: 16px 24px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .search-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .search-count {
          font-size: 14px;
          color: #6B7280;
          margin: 4px 0 0 0;
        }

        .sort-filter-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-filter-btn {
          display: none;
          padding: 8px 14px;
          background: #2563EB;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .sort-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .sort-select {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid #D1D5DB;
          background: #F9FAFB;
          font-size: 14px;
          outline: none;
          cursor: pointer;
          font-weight: 500;
        }

        .main-content-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .sidebar-filters {
          width: 290px;
          flex-shrink: 0;
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          max-height: 85vh;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }

        .sidebar-header h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .close-filter-btn {
          display: none;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          font-weight: bold;
        }

        .filter-group {
          margin-bottom: 20px;
          border-bottom: 1px solid #F3F4F6;
          padding-bottom: 15px;
        }

        .filter-group h4 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #374151;
        }

        .filter-option {
          margin-bottom: 6px;
        }

        .filter-option label {
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4B5563;
        }

        .size-chips-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .size-chip {
          padding: 4px 10px;
          font-size: 12px;
          border-radius: 6px;
          border: 1px solid #D1D5DB;
          background: #fff;
          color: #374151;
          cursor: pointer;
          font-weight: 600;
        }

        .size-chip.active {
          border: 2px solid #2563EB;
          background: #EFF6FF;
          color: #1D4ED8;
        }

        .price-range-input {
          width: 100%;
          accent-color: #2563EB;
        }

        .price-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #6B7280;
          margin-top: 4px;
        }

        .products-grid-area {
          flex: 1;
          width: 100%;
        }

        .products-responsive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .product-card {
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 16px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          transition: transform 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .product-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 12px;
          background: #F9FAFB;
          height: 210px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .discount-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #EF4444;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .product-title {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 6px 0;
          color: #111827;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        }

        .product-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 8px;
        }

        .tag-material {
          font-size: 11px;
          color: #2563EB;
          background: #EFF6FF;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }

        .tag-size {
          font-size: 11px;
          color: #059669;
          background: #ECFDF5;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }

        .product-rating-box {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .rating-text {
          font-size: 12px;
          color: #4B5563;
          font-weight: 600;
        }

        .product-footer-info {
          border-top: 1px solid #F3F4F6;
          padding-top: 10px;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .current-price {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .original-price {
          font-size: 12px;
          color: #9CA3AF;
          text-decoration: line-through;
        }

        .delivery-info {
          font-size: 12px;
          color: #10B981;
          font-weight: 600;
          margin: 4px 0 0 0;
        }

        .no-products-found {
          grid-column: 1 / -1;
          text-align: center;
          padding: 50px;
          background: #fff;
          border-radius: 10px;
        }

        .no-products-found p {
          font-size: 16px;
          color: #6B7280;
          margin: 0;
        }

        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(0.98); }
        }

        @media (max-width: 992px) {
          .main-content-layout {
            flex-direction: column;
          }

          .sidebar-filters {
            position: fixed;
            top: 0;
            left: -100%;
            width: 300px;
            height: 100vh;
            z-index: 10000;
            transition: left 0.3s ease-in-out;
            max-height: 100vh;
            border-radius: 0;
          }

          .sidebar-filters.mobile-active {
            left: 0;
          }

          .close-filter-btn {
            display: block;
          }

          .mobile-filter-btn {
            display: inline-block;
          }

          .pdp-grid {
            flex-direction: column;
          }
        }
      `}</style>

    </div>
  );
};

export default SearchPage;
// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';

// const SearchPage = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q') || '';

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- Selected Product State for Detail View (PDP) ---
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [userComment, setUserComment] = useState('');
//   const [commentsList, setCommentsList] = useState([
//     { user: 'Aman Sharma', text: 'Amazing quality! Highly recommended.' },
//     { user: 'Priya Verma', text: 'Fast delivery and exact same product as shown.' }
//   ]);

//   // --- Dynamic Filter States ---
//   const [selectedSubCategory, setSelectedSubCategory] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(100000);
//   const [minRating, setMinRating] = useState(0);
//   const [selectedColor, setSelectedColor] = useState('All');
//   const [minDiscount, setMinDiscount] = useState(0);
//   const [selectedDelivery, setSelectedDelivery] = useState('All');
//   const [selectedSize, setSelectedSize] = useState('All');
//   const [selectedMaterial, setSelectedMaterial] = useState('All');
//   const [selectedFeature, setSelectedFeature] = useState('All');
//   const [selectedLifestyle, setSelectedLifestyle] = useState('All');
//   const [selectedSeason, setSelectedSeason] = useState('All');
//   const [sortBy, setSortBy] = useState('featured');

//   // Mobile drawer filter toggle state
//   const [showFiltersMobile, setShowFiltersMobile] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (!query) {
//         setProducts([]);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const url = `https://trend-nova-product-api-2.onrender.com/api/products/search?q=${encodeURIComponent(query)}`;
//         const response = await fetch(url);
//         const data = await response.json();
        
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         const enhancedData = data.map((p, idx) => {
//           const lowerName = (p.name || '').toLowerCase();
//           const lowerCat = (p.category || '').toLowerCase();

//           return {
//             ...p,
//             discount: p.discount || (15 + (idx * 7) % 55),
//             color: p.color || ['Black', 'Blue', 'White', 'Red', 'Grey', 'Brown'][idx % 6],
//             deliveryDays: p.deliveryDays || (idx % 2 === 0 ? 'In 2 Days' : '3-5 Days'),
//             size: p.size || (
//               lowerCat.includes('footwear') || lowerName.includes('shoe') 
//                 ? ['UK 7', 'UK 8', 'UK 9', 'UK 10'][idx % 4] 
//                 : ['S', 'M', 'L', 'XL', 'Free Size'][idx % 5]
//             ),
//             material: p.material || (
//               lowerName.includes('watch') ? 'Stainless Steel' :
//               lowerName.includes('shoe') ? 'Leather / Mesh' :
//               lowerName.includes('laptop') || lowerName.includes('mobile') ? 'Aluminium / Glass' :
//               'Pure Cotton'
//             ),
//             feature: p.feature || (
//               lowerName.includes('watch') ? 'Waterproof & Smart Sensors' :
//               lowerName.includes('mobile') || lowerName.includes('laptop') ? 'Fast Charging & 5G' :
//               'Breathable & Durable'
//             ),
//             lifestyle: p.lifestyle || ['Casual', 'Formal', 'Sports', 'Party Wear'][idx % 4],
//             season: p.season || ['All Season', 'Summer Special', 'Winter Wear'][idx % 3],
//             highlights: p.highlights || ['Top Rated', 'Free Delivery', 'Assured Quality'][idx % 3]
//           };
//         });

//         setProducts(enhancedData);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [query]);

//   useEffect(() => {
//     setSelectedSubCategory('All');
//     setMaxPrice(100000);
//     setMinRating(0);
//     setSelectedColor('All');
//     setMinDiscount(0);
//     setSelectedDelivery('All');
//     setSelectedSize('All');
//     setSelectedMaterial('All');
//     setSelectedFeature('All');
//     setSelectedLifestyle('All');
//     setSelectedSeason('All');
//     setSelectedProduct(null); // Reset detail view on new search
//   }, [query]);

//   const dynamicSubCategories = useMemo(() => {
//     if (!products.length) return [];
//     const subCats = new Set();
//     products.forEach(p => {
//       if (p.subCategory) subCats.add(p.subCategory);
//       if (p.category) subCats.add(p.category);
//     });
//     return ['All', ...Array.from(subCats)];
//   }, [products]);

//   const dynamicMaterials = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.material).filter(Boolean)))], [products]);
//   const dynamicFeatures = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.feature).filter(Boolean)))], [products]);
//   const dynamicSizes = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.size).filter(Boolean)))], [products]);

//   const filteredProducts = useMemo(() => {
//     let list = [...products];

//     if (selectedSubCategory !== 'All') {
//       list = list.filter(p => 
//         p.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase() || 
//         p.category?.toLowerCase() === selectedSubCategory.toLowerCase()
//       );
//     }

//     list = list.filter(p => (p.price || 0) <= maxPrice);

//     if (minRating > 0) {
//       list = list.filter(p => (p.rating || 0) >= minRating);
//     }

//     if (selectedColor !== 'All') {
//       list = list.filter(p => p.color?.toLowerCase() === selectedColor.toLowerCase());
//     }

//     if (minDiscount > 0) {
//       list = list.filter(p => (p.discount || 0) >= minDiscount);
//     }

//     if (selectedDelivery !== 'All') {
//       list = list.filter(p => p.deliveryDays === selectedDelivery);
//     }

//     if (selectedSize !== 'All') {
//       list = list.filter(p => p.size === selectedSize);
//     }

//     if (selectedMaterial !== 'All') {
//       list = list.filter(p => p.material === selectedMaterial);
//     }

//     if (selectedFeature !== 'All') {
//       list = list.filter(p => p.feature === selectedFeature);
//     }

//     if (selectedLifestyle !== 'All') {
//       list = list.filter(p => p.lifestyle === selectedLifestyle);
//     }

//     if (selectedSeason !== 'All') {
//       list = list.filter(p => p.season === selectedSeason);
//     }

//     if (sortBy === 'low-high') {
//       list.sort((a, b) => (a.price || 0) - (b.price || 0));
//     } else if (sortBy === 'high-low') {
//       list.sort((a, b) => (b.price || 0) - (a.price || 0));
//     } else if (sortBy === 'rating') {
//       list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//     } else if (sortBy === 'discount') {
//       list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
//     }

//     return list;
//   }, [products, selectedSubCategory, maxPrice, minRating, selectedColor, minDiscount, selectedDelivery, selectedSize, selectedMaterial, selectedFeature, selectedLifestyle, selectedSeason, sortBy]);

//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (!userComment.trim()) return;
//     setCommentsList([...commentsList, { user: 'You (Customer)', text: userComment }]);
//     setUserComment('');
//   };

//   return (
//     <div className="search-page-container">
      
//       {/* --- PERFECTLY CENTERED & RESPONSIVE TRENDNOVA LOADER --- */}
//       {loading && (
//         <div className="loading-overlay">
//           <div className="loading-brand">
//             <span style={{ color: '#111827' }}>Trend</span>
//             <span style={{ color: '#db2777' }}>Nova</span>
//           </div>
//         </div>
//       )}

//       {/* --- PROFESSIONAL PRODUCT DETAIL VIEW (PDP) IF CLICKED --- */}
//       {selectedProduct ? (
//         <div className="pdp-container">
//           <button 
//             className="back-to-search-btn"
//             onClick={() => setSelectedProduct(null)}
//           >
//             ← Back to Search Results
//           </button>

//           <div className="pdp-grid">
//             {/* Left: Images Section with Thumbnails */}
//             <div className="pdp-image-section">
//               <div className="pdp-thumbnails">
//                 {(selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images : [selectedProduct.image]).map((img, idx) => (
//                   <img 
//                     key={idx} 
//                     src={img} 
//                     alt="" 
//                     className={`thumb-img ${activeImageIndex === idx ? 'active-thumb' : ''}`}
//                     onMouseEnter={() => setActiveImageIndex(idx)}
//                     onClick={() => setActiveImageIndex(idx)}
//                   />
//                 ))}
//               </div>
//               <div className="pdp-main-image-box">
//                 <img 
//                   src={(selectedProduct.images && selectedProduct.images[activeImageIndex]) || selectedProduct.image} 
//                   alt={selectedProduct.name} 
//                   className="pdp-main-img"
//                 />
//               </div>
//             </div>

//             {/* Right: Info, Price, Add to Cart & Buy Now */}
//             <div className="pdp-info-section">
//               <h1 className="pdp-product-title">{selectedProduct.name}</h1>
              
//               <div className="pdp-rating-row">
//                 <span style={{ color: '#F59E0B' }}>{'★'.repeat(Math.floor(selectedProduct.rating || 4))}</span>
//                 <span className="pdp-rating-count">{selectedProduct.rating || '4.3'} Rating & Verified Reviews</span>
//               </div>

//               <div className="pdp-price-box">
//                 <span className="pdp-current-price">₹{selectedProduct.price.toLocaleString()}</span>
//                 <span className="pdp-original-price">₹{Math.round(selectedProduct.price * 1.45).toLocaleString()}</span>
//                 <span className="pdp-discount-tag">{selectedProduct.discount}% OFF</span>
//               </div>

//               <div className="pdp-highlights-box">
//                 <p><strong>Category:</strong> {selectedProduct.category} / {selectedProduct.subCategory}</p>
//                 <p><strong>Material / Build:</strong> {selectedProduct.material}</p>
//                 <p><strong>Delivery:</strong> 🚚 {selectedProduct.deliveryDays} Delivery Available</p>
//               </div>

//               {/* Action Buttons */}
//               <div className="pdp-actions-row">
//                 <button 
//                   className="pdp-add-cart-btn"
//                   onClick={() => alert(`🛒 "${selectedProduct.name}" added to Cart successfully!`)}
//                 >
//                   Add to Cart
//                 </button>
//                 <button 
//                   className="pdp-buy-now-btn"
//                   onClick={() => alert(`⚡ Redirecting to Secure Checkout for "${selectedProduct.name}"...`)}
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* --- CUSTOMER COMMENTS & REVIEWS SECTION --- */}
//           <div className="pdp-comments-section">
//             <h3>Customer Comments & Reviews</h3>
            
//             <form onSubmit={handleAddComment} className="comment-form">
//               <input 
//                 type="text" 
//                 placeholder="Write your review or comment about this product..."
//                 value={userComment}
//                 onChange={(e) => setUserComment(e.target.value)}
//                 className="comment-input"
//               />
//               <button type="submit" className="comment-submit-btn">Post Comment</button>
//             </form>

//             <div className="comments-list">
//               {commentsList.map((c, i) => (
//                 <div key={i} className="comment-card">
//                   <strong>👤 {c.user}</strong>
//                   <p>{c.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Top Header & Search Status */}
//           <div className="top-header-banner">
//             <div>
//               <h2 className="search-title">Search Results for "{query}"</h2>
//               <p className="search-count">
//                 Total <strong style={{ color: '#2563EB' }}>{filteredProducts.length}</strong> products found matching your search.
//               </p>
//             </div>
            
//             <div className="sort-filter-wrapper">
//               <button 
//                 className="mobile-filter-btn"
//                 onClick={() => setShowFiltersMobile(true)}
//               >
//                 ⚙️ Filters
//               </button>

//               <div className="sort-box">
//                 <label className="sort-label">Sort by:</label>
//                 <select 
//                   value={sortBy} 
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="sort-select"
//                 >
//                   <option value="featured">Featured / Best Match</option>
//                   <option value="low-high">Price: Low to High</option>
//                   <option value="high-low">Price: High to Low</option>
//                   <option value="rating">Customer Review Rating</option>
//                   <option value="discount">Biggest Discount %</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="main-content-layout">
            
//             {/* --- RESPONSIVE SIDEBAR FILTERS --- */}
//             <div className={`sidebar-filters ${showFiltersMobile ? 'mobile-active' : ''}`}>
//               <div className="sidebar-header">
//                 <h3>Filter Results</h3>
//                 <button 
//                   className="close-filter-btn"
//                   onClick={() => setShowFiltersMobile(false)}
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Dynamic Category / Type */}
//               {dynamicSubCategories.length > 1 && (
//                 <div className="filter-group">
//                   <h4>Category & Type</h4>
//                   {dynamicSubCategories.map((subCat) => (
//                     <div key={subCat} className="filter-option">
//                       <label>
//                         <input 
//                           type="radio" 
//                           name="subCategory" 
//                           checked={selectedSubCategory === subCat} 
//                           onChange={() => setSelectedSubCategory(subCat)} 
//                         />
//                         {subCat}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Delivery Day Filter */}
//               <div className="filter-group">
//                 <h4>Delivery Time</h4>
//                 {['All', 'In 2 Days', '3-5 Days'].map((del) => (
//                   <div key={del} className="filter-option">
//                     <label>
//                       <input 
//                         type="radio" 
//                         name="delivery" 
//                         checked={selectedDelivery === del} 
//                         onChange={() => setSelectedDelivery(del)} 
//                       />
//                       {del === 'In 2 Days' ? '⚡ Get it in 2 Days' : del}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Size Filter */}
//               {dynamicSizes.length > 1 && (
//                 <div className="filter-group">
//                   <h4>Size / Dimension</h4>
//                   <div className="size-chips-wrapper">
//                     {dynamicSizes.map((sz) => (
//                       <button
//                         key={sz}
//                         onClick={() => setSelectedSize(sz)}
//                         className={`size-chip ${selectedSize === sz ? 'active' : ''}`}
//                       >
//                         {sz}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Material Filter */}
//               {dynamicMaterials.length > 1 && (
//                 <div className="filter-group">
//                   <h4>Material</h4>
//                   {dynamicMaterials.map((mat) => (
//                     <div key={mat} className="filter-option">
//                       <label>
//                         <input 
//                           type="radio" 
//                           name="material" 
//                           checked={selectedMaterial === mat} 
//                           onChange={() => setSelectedMaterial(mat)} 
//                         />
//                         {mat}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Price Range */}
//               <div className="filter-group">
//                 <h4>Max Price: ₹{maxPrice.toLocaleString()}</h4>
//                 <input 
//                   type="range" 
//                   min="200" 
//                   max="100000" 
//                   step="500" 
//                   value={maxPrice} 
//                   onChange={(e) => setMaxPrice(Number(e.target.value))} 
//                   className="price-range-input"
//                 />
//                 <div className="price-range-labels">
//                   <span>₹200</span>
//                   <span>₹1,00,000+</span>
//                 </div>
//               </div>

//               {/* Customer Rating */}
//               <div className="filter-group">
//                 <h4>Customer Rating</h4>
//                 {[4, 3, 2, 1].map((stars) => (
//                   <div key={stars} className="filter-option">
//                     <label>
//                       <input 
//                         type="radio" 
//                         name="rating" 
//                         checked={minRating === stars} 
//                         onChange={() => setMinRating(stars)} 
//                       />
//                       <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>{'★'.repeat(stars)}{'☆'.repeat(5-stars)}</span> & up
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Discount Filter */}
//               <div className="filter-group">
//                 <h4>Discount Range</h4>
//                 {[10, 25, 40, 50].map((disc) => (
//                   <div key={disc} className="filter-option">
//                     <label>
//                       <input 
//                         type="radio" 
//                         name="discount" 
//                         checked={minDiscount === disc} 
//                         onChange={() => setMinDiscount(disc)} 
//                       />
//                       {disc}% Off or more
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Special Feature Filter */}
//               {dynamicFeatures.length > 1 && (
//                 <div className="filter-group">
//                   <h4>Special Feature</h4>
//                   {dynamicFeatures.map((ft) => (
//                     <div key={ft} className="filter-option">
//                       <label>
//                         <input 
//                           type="radio" 
//                           name="feature" 
//                           checked={selectedFeature === ft} 
//                           onChange={() => setSelectedFeature(ft)} 
//                         />
//                         {ft}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Lifestyle & Purpose */}
//               <div className="filter-group">
//                 <h4>Lifestyle & Purpose</h4>
//                 {['All', 'Casual', 'Formal', 'Sports', 'Party Wear'].map((ls) => (
//                   <div key={ls} className="filter-option">
//                     <label>
//                       <input 
//                         type="radio" 
//                         name="lifestyle" 
//                         checked={selectedLifestyle === ls} 
//                         onChange={() => setSelectedLifestyle(ls)} 
//                       />
//                       {ls}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Season Filter */}
//               <div className="filter-group" style={{ borderBottom: 'none' }}>
//                 <h4>Season</h4>
//                 {['All', 'All Season', 'Summer Special', 'Winter Wear'].map((sn) => (
//                   <div key={sn} className="filter-option">
//                     <label>
//                       <input 
//                         type="radio" 
//                         name="season" 
//                         checked={selectedSeason === sn} 
//                         onChange={() => setSelectedSeason(sn)} 
//                       />
//                       {sn}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//             </div>

//             {/* --- PRODUCTS DISPLAY GRID (CLICKABLE TO OPEN PDP) --- */}
//             <div className="products-grid-area">
//               <div className="products-responsive-grid">
//                 {filteredProducts && filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <div 
//                       key={product._id || product.id} 
//                       className="product-card"
//                       onClick={() => {
//                         setSelectedProduct(product);
//                         setActiveImageIndex(0);
//                       }}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <div>
//                         <div className="product-image-container">
//                           <img 
//                             src={product.image || 'https://via.placeholder.com/150'} 
//                             alt={product.name} 
//                             className="product-img" 
//                           />
//                           <span className="discount-badge">
//                             {product.discount}% OFF
//                           </span>
//                         </div>

//                         <h3 className="product-title">
//                           {product.name}
//                         </h3>

//                         <div className="product-tags">
//                           <span className="tag-material">
//                             {product.material}
//                           </span>
//                           <span className="tag-size">
//                             Size: {product.size}
//                           </span>
//                         </div>

//                         <div className="product-rating-box">
//                           <span style={{ color: '#F59E0B', fontSize: '14px' }}>
//                             {'★'.repeat(Math.floor(product.rating || 4))}
//                           </span>
//                           <span className="rating-text">{product.rating || '4.2'}</span>
//                         </div>
//                       </div>

//                       <div className="product-footer-info">
//                         <div className="price-row">
//                           <span className="current-price">
//                             ₹{product.price.toLocaleString()}
//                           </span>
//                           <span className="original-price">
//                             ₹{Math.round(product.price * 1.45).toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="delivery-info">
//                           🚚 {product.deliveryDays} Delivery
//                         </p>
//                       </div>

//                     </div>
//                   ))
//                 ) : (
//                   <div className="no-products-found">
//                     <p>No products found for "{query}" with these filters.</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </>
//       )}

//       {/* --- RESPONSIVE CSS STYLES --- */}
//       <style>{`
//         .search-page-container {
//           padding: 20px;
//           max-width: 1440px;
//           margin: 80px auto 20px auto;
//           font-family: "Inter", "Segoe UI", Roboto, sans-serif;
//           color: #0F1111;
//           background-color: #F3F4F6;
//           min-height: 80vh;
//           box-sizing: border-box;
//           position: relative;
//         }

//         /* PDP Styling */
//         .pdp-container {
//           background: #fff;
//           padding: 30px;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .back-to-search-btn {
//           background: #2563EB;
//           color: #fff;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: 600;
//           margin-bottom: 20px;
//         }

//         .pdp-grid {
//           display: flex;
//           gap: 40px;
//           flex-wrap: wrap;
//         }

//         .pdp-image-section {
//           display: flex;
//           gap: 16px;
//           flex: 1;
//           min-width: 320px;
//         }

//         .pdp-thumbnails {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .thumb-img {
//           width: 60px;
//           height: 60px;
//           object-fit: cover;
//           border-radius: 6px;
//           border: 1px solid #D1D5DB;
//           cursor: pointer;
//         }

//         .thumb-img.active-thumb {
//           border: 2px solid #db2777;
//         }

//         .pdp-main-image-box {
//           flex: 1;
//           background: #F9FAFB;
//           border: 1px solid #E5E7EB;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 400px;
//         }

//         .pdp-main-img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//         }

//         .pdp-info-section {
//           flex: 1;
//           min-width: 300px;
//         }

//         .pdp-product-title {
//           font-size: 26px;
//           font-weight: 800;
//           color: #111827;
//           margin: 0 0 10px 0;
//           line-height: 1.3;
//         }

//         .pdp-rating-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 15px;
//         }

//         .pdp-rating-count {
//           font-size: 13px;
//           color: #4B5563;
//         }

//         .pdp-price-box {
//           display: flex;
//           align-items: baseline;
//           gap: 12px;
//           margin-bottom: 20px;
//           border-bottom: 1px solid #E5E7EB;
//           padding-bottom: 15px;
//         }

//         .pdp-current-price {
//           font-size: 28px;
//           font-weight: 800;
//           color: #111827;
//         }

//         .pdp-original-price {
//           font-size: 16px;
//           color: #9CA3AF;
//           text-decoration: line-through;
//         }

//         .pdp-discount-tag {
//           background: #EF4444;
//           color: #fff;
//           font-size: 12px;
//           font-weight: 700;
//           padding: 4px 8px;
//           border-radius: 4px;
//         }

//         .pdp-highlights-box {
//           font-size: 14px;
//           color: #374151;
//           margin-bottom: 25px;
//           line-height: 1.6;
//         }

//         .pdp-actions-row {
//           display: flex;
//           gap: 15px;
//         }

//         .pdp-add-cart-btn {
//           flex: 1;
//           background: #F59E0B;
//           color: #fff;
//           border: none;
//           padding: 14px;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .pdp-buy-now-btn {
//           flex: 1;
//           background: #F97316;
//           color: #fff;
//           border: none;
//           padding: 14px;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .pdp-comments-section {
//           margin-top: 40px;
//           border-top: 2px solid #E5E7EB;
//           padding-top: 25px;
//         }

//         .pdp-comments-section h3 {
//           font-size: 18px;
//           font-weight: 700;
//           margin-bottom: 15px;
//         }

//         .comment-form {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 20px;
//         }

//         .comment-input {
//           flex: 1;
//           padding: 10px 14px;
//           border: 1px solid #D1D5DB;
//           border-radius: 6px;
//           outline: none;
//         }

//         .comment-submit-btn {
//           background: #2563EB;
//           color: #fff;
//           border: none;
//           padding: 10px 18px;
//           border-radius: 6px;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .comments-list {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .comment-card {
//           background: #F9FAFB;
//           padding: 12px 16px;
//           border-radius: 6px;
//           border: 1px solid #E5E7EB;
//         }

//         .comment-card p {
//           margin: 4px 0 0 0;
//           color: #4B5563;
//           font-size: 14px;
//         }

//         /* PERFECT RESPONSIVE FULLSCREEN LOADER */
//         .loading-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           width: 100%;
//           height: 100vh;
//           background: rgba(255, 255, 255, 0.95);
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//           z-index: 99999;
//           backdrop-filter: blur(5px);
//           box-sizing: border-box;
//           padding: 20px;
//         }

//         .loading-brand {
//           font-size: 36px;
//           font-weight: 800;
//           letter-spacing: 0.5px;
//           animation: pulse 1.2s infinite ease-in-out;
//           margin-bottom: 8px;
//         }

//         .top-header-banner {
//           background: #fff;
//           padding: 16px 24px;
//           border-radius: 10px;
//           margin-bottom: 20px;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.08);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 15px;
//         }

//         .search-title {
//           font-size: 20px;
//           font-weight: 700;
//           margin: 0;
//           color: #111827;
//         }

//         .search-count {
//           font-size: 14px;
//           color: #6B7280;
//           margin: 4px 0 0 0;
//         }

//         .sort-filter-wrapper {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .mobile-filter-btn {
//           display: none;
//           padding: 8px 14px;
//           background: #2563EB;
//           color: #fff;
//           border: none;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .sort-box {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .sort-label {
//           font-size: 14px;
//           font-weight: 600;
//           color: #374151;
//         }

//         .sort-select {
//           padding: 8px 14px;
//           border-radius: 8px;
//           border: 1px solid #D1D5DB;
//           background: #F9FAFB;
//           font-size: 14px;
//           outline: none;
//           cursor: pointer;
//           font-weight: 500;
//         }

//         .main-content-layout {
//           display: flex;
//           gap: 24px;
//           align-items: flex-start;
//         }

//         .sidebar-filters {
//           width: 290px;
//           flex-shrink: 0;
//           background: #fff;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.08);
//           max-height: 85vh;
//           overflow-y: auto;
//           box-sizing: border-box;
//         }

//         .sidebar-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-bottom: 2px solid #E5E7EB;
//           padding-bottom: 8px;
//           margin-bottom: 16px;
//         }

//         .sidebar-header h3 {
//           font-size: 16px;
//           font-weight: 700;
//           margin: 0;
//           color: #111827;
//         }

//         .close-filter-btn {
//           display: none;
//           background: none;
//           border: none;
//           font-size: 18px;
//           cursor: pointer;
//           font-weight: bold;
//         }

//         .filter-group {
//           margin-bottom: 20px;
//           border-bottom: 1px solid #F3F4F6;
//           padding-bottom: 15px;
//         }

//         .filter-group h4 {
//           font-size: 14px;
//           font-weight: 700;
//           margin-bottom: 10px;
//           color: #374151;
//         }

//         .filter-option {
//           margin-bottom: 6px;
//         }

//         .filter-option label {
//           font-size: 13px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           color: #4B5563;
//         }

//         .size-chips-wrapper {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 6px;
//         }

//         .size-chip {
//           padding: 4px 10px;
//           font-size: 12px;
//           border-radius: 6px;
//           border: 1px solid #D1D5DB;
//           background: #fff;
//           color: #374151;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         .size-chip.active {
//           border: 2px solid #2563EB;
//           background: #EFF6FF;
//           color: #1D4ED8;
//         }

//         .price-range-input {
//           width: 100%;
//           accent-color: #2563EB;
//         }

//         .price-range-labels {
//           display: flex;
//           justify-content: space-between;
//           font-size: 12px;
//           color: #6B7280;
//           margin-top: 4px;
//         }

//         .products-grid-area {
//           flex: 1;
//           width: 100%;
//         }

//         .products-responsive-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//           gap: 20px;
//         }

//         .product-card {
//           border: 1px solid #E5E7EB;
//           border-radius: 10px;
//           padding: 16px;
//           background: #fff;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.04);
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           box-sizing: border-box;
//           transition: transform 0.2s ease;
//         }

//         .product-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//         }

//         .product-image-container {
//           position: relative;
//           overflow: hidden;
//           border-radius: 8px;
//           margin-bottom: 12px;
//           background: #F9FAFB;
//           height: 210px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .product-img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//           padding: 8px;
//         }

//         .discount-badge {
//           position: absolute;
//           top: 8px;
//           left: 8px;
//           background: #EF4444;
//           color: #fff;
//           font-size: 11px;
//           font-weight: 700;
//           padding: 3px 8px;
//           border-radius: 4px;
//         }

//         .product-title {
//           font-size: 15px;
//           font-weight: 600;
//           margin: 0 0 6px 0;
//           color: #111827;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           line-height: 1.4;
//         }

//         .product-tags {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 4px;
//           margin-bottom: 8px;
//         }

//         .tag-material {
//           font-size: 11px;
//           color: #2563EB;
//           background: #EFF6FF;
//           padding: 2px 6px;
//           border-radius: 4px;
//           font-weight: 500;
//         }

//         .tag-size {
//           font-size: 11px;
//           color: #059669;
//           background: #ECFDF5;
//           padding: 2px 6px;
//           border-radius: 4px;
//           font-weight: 500;
//         }

//         .product-rating-box {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           margin-bottom: 10px;
//         }

//         .rating-text {
//           font-size: 12px;
//           color: #4B5563;
//           font-weight: 600;
//         }

//         .product-footer-info {
//           border-top: 1px solid #F3F4F6;
//           padding-top: 10px;
//         }

//         .price-row {
//           display: flex;
//           align-items: baseline;
//           gap: 8px;
//         }

//         .current-price {
//           font-size: 18px;
//           font-weight: 700;
//           color: #111827;
//         }

//         .original-price {
//           font-size: 12px;
//           color: #9CA3AF;
//           text-decoration: line-through;
//         }

//         .delivery-info {
//           font-size: 12px;
//           color: #10B981;
//           font-weight: 600;
//           margin: 4px 0 0 0;
//         }

//         .no-products-found {
//           grid-column: 1 / -1;
//           text-align: center;
//           padding: 50px;
//           background: #fff;
//           border-radius: 10px;
//         }

//         .no-products-found p {
//           font-size: 16px;
//           color: #6B7280;
//           margin: 0;
//         }

//         @keyframes pulse {
//           0% { opacity: 0.5; transform: scale(0.98); }
//           50% { opacity: 1; transform: scale(1); }
//           100% { opacity: 0.5; transform: scale(0.98); }
//         }

//         @media (max-width: 992px) {
//           .main-content-layout {
//             flex-direction: column;
//           }

//           .sidebar-filters {
//             position: fixed;
//             top: 0;
//             left: -100%;
//             width: 300px;
//             height: 100vh;
//             z-index: 10000;
//             transition: left 0.3s ease-in-out;
//             max-height: 100vh;
//             border-radius: 0;
//           }

//           .sidebar-filters.mobile-active {
//             left: 0;
//           }

//           .close-filter-btn {
//             display: block;
//           }

//           .mobile-filter-btn {
//             display: inline-block;
//           }

//           .pdp-grid {
//             flex-direction: column;
//           }
//         }
//       `}</style>

//     </div>
//   );
// };

// export default SearchPage;