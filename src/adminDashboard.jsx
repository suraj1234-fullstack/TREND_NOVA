import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default Dark / Light Toggle

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    price: '',
    tags: '',
    image: '',
  });

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // --- NEW COUPON MANAGEMENT STATES ---
 // ✅ LocalStorage-backed coupons state
  const [coupons, setCoupons] = useState(() => {
    const savedCoupons = localStorage.getItem('trendnova_admin_coupons');
    return savedCoupons ? JSON.parse(savedCoupons) : [
      { id: 1, code: 'TREND30', discount: 30, status: 'Active' },
      { id: 2, code: 'FESTIVE20', discount: 20, status: 'Active' }
    ];
  });
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  // Save coupons to localStorage automatically
  useEffect(() => {
    localStorage.setItem('trendnova_admin_coupons', JSON.stringify(coupons));
  }, [coupons]); // const [coupons, setCoupons] = useState([
  //   { id: 1, code: 'TREND30', discount: 30, status: 'Active' },
  //   { id: 2, code: 'FESTIVE20', discount: 20, status: 'Active' }
  // ]);
  
  
  
  
  
  
  
  
  
  
  
  
  
 
  
  
  // Sample Analytics Chart Data
  const salesData = [
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 5000, orders: 32 },
    { name: 'Thu', sales: 2780, orders: 15 },
    { name: 'Fri', sales: 6890, orders: 45 },
    { name: 'Sat', sales: 8500, orders: 58 },
    { name: 'Sun', sales: 9200, orders: 64 },
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://trend-nova-product-api-2.onrender.com/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Products fetch error ', error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await axios.get('https://auth-api-gtqf.onrender.com/api/auth/users');
      setUsers(response.data.users || response.data);
    } catch (error) {
      console.error('Users fetch error (Auth API):', error);
      setUsers([
        { _id: '1', name: 'Suraj Kumar', email: 'web.devsurajkumar1980@gmail.com', role: 'admin' },
        { _id: '2', name: 'Demo User', email: 'user@gmail.com', role: 'user' }
      ]);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://trend-nova-product-api-2.onrender.com/api/products/${id}`);
        setProducts(products.filter((product) => (product._id !== id) && (product.id !== id)));
        alert('Product deleted successfully from database!');
      } catch (error) {
        console.error('Product delete error:', error);
        alert('Product delete karne mein error aaya.');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://auth-api-gtqf.onrender.com/api/auth/users/${userId}`);
        setUsers(users.filter(u => (u._id !== userId) && (u.id !== userId)));
        alert('User deleted successfully!');
      } catch (error) {
        console.error('User delete error:', error);
        setUsers(users.filter(u => (u._id !== userId) && (u.id !== userId)));
        alert('User removed from UI list.');
      }
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Change user role to ${newRole.toUpperCase()}?`)) {
      try {
        await axios.put(`https://auth-api-gtqf.onrender.com/api/auth/users/${userId}`, { role: newRole });
        setUsers(users.map(u => {
          if ((u._id === userId) || (u.id === userId)) {
            return { ...u, role: newRole };
          }
          return u;
        }));
        alert(`User role updated to ${newRole} successfully!`);
      } catch (error) {
        console.error('Role update error:', error);
        setUsers(users.map(u => {
          if ((u._id === userId) || (u.id === userId)) {
            return { ...u, role: newRole };
          }
          return u;
        }));
      }
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Error: Product image select karna zaroori hai!');
      return;
    }

    try {
      const newProductPayload = {
        name: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        price: Number(formData.price),
        tags: formData.tags,
        image: formData.image,
        images: [formData.image],
      };

      const response = await axios.post('https://trend-nova-product-api-2.onrender.com/api/products', newProductPayload);
      setProducts([...products, response.data.product || response.data]);
      setFormData({ name: '', category: '', subCategory: '', price: '', tags: '', image: '' });
      setShowAddModal(false);
      alert('Product successfully added!');
      fetchProducts();
    } catch (error) {
      console.error('Product add error:', error);
      alert('Product add karne mein error aaya.');
    }
  };

  // --- CREATE COUPON HANDLER ---
  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount) {
      alert("Please enter coupon code and discount percentage!");
      return;
    }
    const newCoupon = {
      id: Date.now(),
      code: newCouponCode.trim().toUpperCase(),
      discount: Number(newCouponDiscount),
      status: 'Active'
    };
    setCoupons([...coupons, newCoupon]);
    setNewCouponCode('');
    setNewCouponDiscount('');
    alert(`🎉 Coupon ${newCoupon.code} successfully created!`);
  };
  // const handleCreateCoupon = (e) => {
  //   e.preventDefault();
  //   if (!newCouponCode || !newCouponDiscount) {
  //     alert("Please enter coupon code and discount percentage!");
  //     return;
  //   }
  //   const newCoupon = {
  //     id: Date.now(),
  //     code: newCouponCode.trim().toUpperCase(),
  //     discount: Number(newCouponDiscount),
  //     status: 'Active'
  //   };
  //   setCoupons([...coupons, newCoupon]);
  //   setNewCouponCode('');
  //   setNewCouponDiscount('');
  //   alert(`🎉 Coupon ${newCoupon.code} successfully created!`);
  // };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
    alert('Coupon deleted successfully!');
  };

  const filteredProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase();
    return (
      (product.name && product.name.toLowerCase().includes(query)) ||
      (product.category && product.category.toLowerCase().includes(query)) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(query)) ||
      (product.tags && product.tags.toLowerCase().includes(query))
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'name-az') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className={`admin-layout ${darkMode ? 'light-theme' : 'dark-theme'}`}>
      
      {/* Mobile Top Navbar */}
      <div className="admin-mobile-header">
        <div className="mobile-brand">
          <div className="brand-logo-box"><i class="fa-solid fa-user-tie"></i></div>
          <span>Trend<strong>Nova</strong> Admin</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle-btn">
            {darkMode ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-toggle">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand-box">
          <div className="brand-logo-box"><i class="fa-solid fa-user-tie"></i></div>
          <div>
            <h2>Trend<span>Nova</span></h2>
            <span>Enterprise Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}>
            <i class="fa-solid fa-magnifying-glass-chart"></i> Visual Overview
          </button>
          <button onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}>
            <i class="fa-regular fa-rectangle-list"></i> Products Inventory
          </button>
          <button onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}>
            <i class="fa-solid fa-users"></i> Users & Roles ({users.length})
          </button>
          <button onClick={() => { setActiveTab('coupons'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'coupons' ? 'active' : ''}`}>
            <i class="fa-solid fa-tag"></i> Coupon Manager
          </button>
          <button onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}>
            <i class="fa-solid fa-cart-arrow-down"></i> Customer Orders
          </button>
          <button onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}>
            <i class="fa-solid fa-gears"></i> Store Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => setDarkMode(!darkMode)} className="theme-desktop-btn">
            {darkMode ? <span><i class="fa-solid fa-sun"></i> Light Mode </span> : <span><i class="fa-solid fa-moon"></i> Dark Mode</span>}
            
            
          </button>
          <a href="/" className="back-store-btn">← Return to Store</a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        
        {/* --- TAB 1: VISUAL ANALYTICS & OVERVIEW --- */}
        {activeTab === 'analytics' && (
          <div className="tab-pane">
            <div className="section-header">
              <h1>Store Analytics & Performance</h1>
              <p>Real-time visual insights and metrics for TrendNova.</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card products-stat">
                <span className="stat-label">TOTAL PRODUCTS</span>
                <span className="stat-value">{products.length}</span>
              </div>
              <div className="stat-card users-stat">
                <span className="stat-label">REGISTERED USERS</span>
                <span className="stat-value">{users.length}</span>
              </div>
              <div className="stat-card revenue-stat">
                <span className="stat-label">WEEKLY REVENUE</span>
                <span className="stat-value">₹39,270</span>
              </div>
            </div>

            {/* Recharts Visual Graph */}
            <div className="chart-container-card">
              <h3><i class="fa-solid fa-arrow-trend-up"></i> Weekly Sales & Revenue Trend</h3>
              <div style={{ width: '100%', height: 300, marginTop: '16px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#cbd5e1'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#475569'} />
                    <YAxis stroke={darkMode ? '#94a3b8' : '#475569'} />
                    <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1e293b' : 'rgb(255, 255, 255)', borderColor: darkMode ? '#334155' : '#cbd5e1', color: darkMode ? '#fff' : '#000' }} />
                    <Line type="monotone" dataKey="sales" stroke="#db2777" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: PRODUCTS --- */}
        {activeTab === 'products' && (
          <div className="tab-pane">
            <div className="section-header-flex">
              <div>
                <h2>Products Inventory</h2>
                <p>Manage items, prices and catalogue</p>
              </div>
              <button onClick={() => setShowAddModal(true)} className="btn-primary-green">
                + Add Product
              </button>
            </div>

            <div className="toolbar-box">
              <input 
                type="text" 
                placeholder=" Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="default">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-az">Name: A to Z</option>
              </select>
            </div>

{showAddModal && (
  <div className="professional-add-product-container">
    <div className="add-product-header-bar">
      <div>
        <h2>Product Listing</h2>
        <p>Add some product and go to live..</p>
      </div>
      <button onClick={() => setShowAddModal(false)} className="btn-close-pane">✕ Cancel / Close</button>
    </div>

    <form onSubmit={handleAddProductSubmit} className="professional-product-form">
      
      {/* Section 1: Basic Information */}
      <div className="form-section-card">
        <h3>1. Basic Product Information</h3>
        <div className="form-group full-width-group">
          <label>Product Title / Name *</label>
          <input 
            type="text" 
            required 
            placeholder="Your Product Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <input 
              type="text" 
              required 
              placeholder="Men / Women / Electronics" 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>SubCategory / Type *</label>
            <input 
              type="text" 
              required 
              placeholder="Hoodies / Sneakers / Smartwatches" 
              value={formData.subCategory} 
              onChange={(e) => setFormData({...formData, subCategory: e.target.value})} 
            />
          </div>
        </div>
      </div>

      {/* Section 2: Pricing & SEO Tags */}
      <div className="form-section-card">
        <h3>2. Pricing & Tags</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Selling Price (₹) *</label>
            <input 
              type="number" 
              required 
              placeholder="e.g. 1499" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
            />
          </div>
          
          
        </div>
      </div>

      {/* Section 3: High-Res Media & Banner */}
      <div className="form-section-card">
        <h3>3. Product Media & Banner</h3>
        <div className="form-group full-width-group">
          <label className="file-label">Upload Product Image *</label>
          <input 
            type="file" 
            accept="image/*" 
            required 
            onChange={handleImageSelect} 
            className="file-input" 
          />
          <div className={`file-status ${formData.image ? 'success' : 'error'}`}>
            {formData.image ? 'Image successfully uploaded' : 'Upload clear product image (PNG, JPG, JPEG)'}
          </div>
          {formData.image && (
            <div className="image-preview-box">
              <img src={formData.image} alt="Preview" className="preview-thumb" />
              <span className="preview-text">Preview Loaded Successfully</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions-bar">
        <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel-large">Discard</button>
        <button type="submit" className="btn-save-large">Publish Product Live <i class="fa-solid fa-angle-right"></i></button>
      </div>

    </form>
  </div>
)}


              

              {/* <div className="form-group">
                        <label>Search Tags & Keywords (Comma separated)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. winter, casual, trending, hoodie" 
                          value={formData.tags} 
                          onChange={(e) => setFormData({...formData, tags: e.target.value})} 
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '3px' }}>Help customers discover your item easily via search bar.</small>
                      </div> */}

            {/* {showAddModal && (
              <div className="modal-overlay">
                <div className="modal-card">
                  <h3>Add New Product</h3>
                  <form onSubmit={handleAddProductSubmit} className="modal-form">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input type="text" required placeholder="e.g. Classic Denim" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Category</label>
                        <input type="text" required placeholder="e.g. Men" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>SubCategory</label>
                        <input type="text" required placeholder="e.g. Jeans" value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price (₹)</label>
                        <input type="number" required placeholder="1299" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Tags</label>
                        <input type="text" placeholder="casual" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="file-label">Product Image *</label>
                      <input type="file" accept="image/*" required onChange={handleImageSelect} className="file-input" />
                      <div className={`file-status ${formData.image ? 'success' : 'error'}`}>
                        {formData.image ? '✅ Image selected!' : '⚠️ Image required'}
                      </div>
                    </div>
                    <div className="modal-buttons">
                      <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel">Cancel</button>
                      <button type="submit" className="btn-save">Save Product</button>
                    </div>
                  </form>
                </div>
              </div>
            )} */}

            {loading ? (
              <div className="loading-state">Loading products...</div>
            ) : (
              <div className="products-grid-mobile">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <div key={product._id || product.id} className="admin-product-card-item">
                      <img src={product.image || (product.images && product.images[0])} alt={product.name} className="card-item-img" />
                      <div className="card-item-details">
                        <h4>{product.name}</h4>
                        <p className="card-meta"><b>Cat:</b> {product.category} / {product.subCategory}</p>
                        <p className="card-meta"><b>Tags:</b> {product.tags || 'N/A'}</p>
                        <div className="card-price-action">
                          <span className="card-price">₹{product.price}</span>
                          <button onClick={() => handleDelete(product._id || product.id)} className="btn-delete">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-table-cell">No products found!</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: USERS --- */}
        {activeTab === 'users' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Users Management</h2>
              <p>Manage user roles & permissions</p>
            </div>

            {usersLoading ? (
              <div className="loading-state">Loading users...</div>
            ) : (
              <div className="products-grid-mobile">
                {users.length > 0 ? (
                  users.map((usr) => (
                    <div key={usr._id || usr.id} className="admin-product-card-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="user-title">{usr.name || usr.username || 'User'}</span>
                        <span className={`role-badge ${usr.role === 'admin' ? 'admin' : 'user'}`}>{usr.role || 'user'}</span>
                      </div>
                      <p className="card-meta" style={{ wordBreak: 'break-all', marginBottom: '4px' }}><b>Email:</b> {usr.email || 'N/A'}</p>
                      <p className="card-meta" style={{ marginBottom: '12px' }}><b>ID:</b> {usr._id || usr.id}</p>
                      <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        <button onClick={() => handleToggleRole(usr._id || usr.id, usr.role || 'user')} className="btn-role">
                          {usr.role === 'admin' ? 'Demote' : 'Make Admin'}
                        </button>
                        <button onClick={() => handleDeleteUser(usr._id || usr.id)} className="btn-delete">Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-table-cell">No users found!</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: NEW COUPON MANAGER --- */}
        {activeTab === 'coupons' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Coupon & Promo Code Manager</h2>
              <p>Create and manage discount codes for customers at checkout</p>
            </div>

            {/* Create Coupon Form Box */}
            <div className="coupon-create-card">
              <h3>Create New Coupon</h3>
              <form onSubmit={handleCreateCoupon} className="coupon-form">
                <input 
                  type="text" 
                  placeholder="Coupon Code (e.g. DIWALI50)" 
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="search-input"
                  required
                />
                <input 
                  type="number" 
                  placeholder="Discount % (e.g. 25)" 
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  className="search-input"
                  required
                />
                <button type="submit" className="btn-primary-green">+ Create Coupon</button>
              </form>
            </div>

            {/* Active Coupons List */}
            <h3 style={{ margin: '20px 0 10px 0', fontSize: '16px' }}>Active Store Coupons</h3>
            <div className="products-grid-mobile">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="admin-product-card-item" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ color: '#db2777', fontSize: '16px', marginBottom: '4px' }}><i class="fa-solid fa-tag"></i> {coupon.code}</h4>
                    <p className="card-meta"><b>Discount:</b> Flat {coupon.discount}% OFF</p>
                    <span className="role-badge admin" style={{ marginTop: '6px', display: 'inline-block' }}>{coupon.status}</span>
                  </div>
                  <button onClick={() => handleDeleteCoupon(coupon.id)} className="btn-delete">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: ORDERS --- */}
        {activeTab === 'orders' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Customer Orders</h2>
              <p>View and fulfill orders</p>
            </div>
            <div className="info-box-card">📦 No orders placed yet.</div>
          </div>
        )}

        {/* --- TAB 6: SETTINGS --- */}
        {activeTab === 'settings' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Store Settings</h2>
              <p>API endpoints configuration</p>
            </div>
            <div className="settings-card">
              <div className="form-group">
                <label>Product API</label>
                <input type="text" readOnly value="https://trend-nova-product-api-2.onrender.com/api/products" className="readonly-input" />
              </div>
              <div className="form-group">
                <label>Auth API</label>
                <input type="text" readOnly value="https://auth-api-gtqf.onrender.com/api/auth" className="readonly-input" />
              </div>
              <div className="status-success-text">✅ Connected securely.</div>
            </div>
          </div>
        )}

      </main>

      {/* --- ULTRA PROFESSIONAL CSS (DARK / LIGHT MODE & RESPONSIVE) --- */}
      <style>{`
        /* Theme Variables */
        .admin-layout.dark-theme {
          --bg-main: #0b0f19;
          --bg-card: #111827;
          --bg-sidebar: #030712;
          --text-main: #f3f4f6;
          --text-muted: #9ca3af;
          --border-color: #1f2937;
          --input-bg: #1f2937;
        }
        .admin-layout.light-theme {
          --bg-main: #f8fafc;
          --bg-card: #ffffff;
          --bg-sidebar: #0f172a;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --input-bg: #f8fafc;
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-main);
          font-family: 'Inter', system-ui, sans-serif;
          box-sizing: border-box;
          width: 100vw;
          overflow-x: hidden;
          transition: background 0.3s, color 0.3s;
        }

        .admin-mobile-header {
          display: none;
          background: var(--bg-sidebar);
          color: #fff;
          padding: 12px 16px;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0; left: 0; width: 100%;
          z-index: 1000;
          box-sizing: border-box;
        }
        .mobile-brand { display: flex; align-items: center; gap: 10px; font-size: 15px; }
        .mobile-menu-toggle, .theme-toggle-btn {
          background: #db2777; color: #fff; border: none;
          padding: 6px 12px; border-radius: 6px; font-weight: 800; cursor: pointer;
        }

        .admin-sidebar {
          width: 260px;
          background: var(--bg-sidebar);
          color: #fff;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 999;
          transition: transform 0.3s ease;
          box-sizing: border-box;
          top: 0; left: 0;
          border-right: 1px solid var(--border-color);
        }

        .sidebar-brand-box {
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; gap: 10px;
        }
        .brand-logo-box {
          background: #db2777; color: #fff; width: 34px; height: 34px;
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 16px; flex-shrink: 0;
        }
        .sidebar-brand-box h2 { color: #db2777; margin: 0; font-size: 18px; font-weight: 800; line-height: 1.1; }
        .sidebar-brand-box h2 span { color: #fff; }
        .sidebar-brand-box span { font-size: 11px; color: #94a3b8; }

        .sidebar-nav {
          padding: 16px 10px; display: flex; flex-direction: column; gap: 6px; flex: 1; overflow-y: auto;
        }
        .nav-btn {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
          background: transparent; color: #cbd5e1; border: none; border-radius: 8px;
          cursor: pointer; font-weight: 600; font-size: 13px; text-align: left; transition: all 0.2s;
        }
        .nav-btn:hover { background: rgba(219, 39, 119, 0.15); color: #fff; }
        .nav-btn.active { background: #db2777; color: #fff; }

        .sidebar-footer { padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 8px; }
        .theme-desktop-btn {
          background: #334155; color: #fff; border: none; padding: 8px; border-radius: 6px;
          font-weight: 600; font-size: 12px; cursor: pointer; text-align: center;
        }
        .back-store-btn {
          display: block; padding: 8px; background: #1e293b; color: #fff;
          text-align: center; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 600;
        }

        .admin-main-content {
          margin-left: 260px; flex: 1; padding: 30px; width: calc(100vw - 260px);
          box-sizing: border-box; overflow-x: hidden; background-color: var(--bg-main);
        }

        .tab-pane { width: 100%; box-sizing: border-box; }

        .section-header { margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px; }
        .section-header h1, .section-header h2 { color: var(--text-main); margin: 0 0 2px 0; font-size: 22px; font-weight: 800; }
        .section-header p { color: var(--text-muted); margin: 0; font-size: 12px; }

        .section-header-flex {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 16px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px; flex-wrap: wrap; gap: 10px;
        }
        .section-header-flex h2 { color: var(--text-main); margin: 0 0 2px 0; font-size: 22px; font-weight: 800; }
        .section-header-flex p { color: var(--text-muted); margin: 0; font-size: 12px; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: var(--bg-card); padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); border: 1px solid var(--border-color); }
        .products-stat { border-left: 4px solid #db2777; }
        .users-stat { border-left: 4px solid #059669; }
        .revenue-stat { border-left: 4px solid #3b82f6; }
        .stat-label { font-size: 11px; color: var(--text-muted); font-weight: 700; }
        .stat-value { font-size: 28px; font-weight: 800; color: var(--text-main); margin-top: 6px; display: block; }

        .chart-container-card {
          background: var(--bg-card); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 24px;
        }
        .chart-container-card h3 { margin: 0; font-size: 16px; font-weight: 700; color: var(--text-main); }

        .toolbar-box {
          display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;
          background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);
        }
        .search-input {
          flex: 1; min-width: 180px; padding: 8px 12px; border-radius: 6px;
          border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-main); font-size: 13px; outline: none;
        }
        .sort-select {
          padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);
          background: var(--input-bg); color: var(--text-main); font-size: 13px; outline: none;
        }

        .btn-primary-green { padding: 8px 16px; background: #059669; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; }
        .btn-delete { padding: 6px 12px; background: #dc2626; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600; }
        .btn-role { padding: 6px 10px; background: #3b82f6; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600; }

        .products-grid-mobile { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; width: 100%; box-sizing: border-box; }
        .admin-product-card-item {
          background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px;
          padding: 14px; display: flex; gap: 12px; align-items: center; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .card-item-img { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color); background: var(--input-bg); flex-shrink: 0; }
        .card-item-details { flex: 1; min-width: 0; }
        .card-item-details h4 { margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-meta { margin: 0 0 2px 0; font-size: 12px; color: var(--text-muted); }
        .card-price-action { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
        .card-price { font-size: 15px; font-weight: 800; color: #059669; }

        .user-title { font-weight: 700; color: var(--text-main); font-size: 14px; }
        .role-badge { padding: 3px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
        .role-badge.admin { background: #dbeafe; color: #1d4ed8; }
        .role-badge.user { background: #334155; color: #cbd5e1; }

        .coupon-create-card { background: var(--bg-card); padding: 16px; border-radius: 10px; border: 1px solid var(--border-color); margin-bottom: 20px; }
        .coupon-create-card h3 { margin: 0 0 10px 0; font-size: 15px; color: var(--text-main); }
        .coupon-form { display: flex; gap: 10px; flex-wrap: wrap; }

        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: center; z-index: 10000; padding: 16px; box-sizing: border-box;
        }
        .modal-card {
          background: var(--bg-card); padding: 20px; border-radius: 12px;
          width: 440px; max-width: 100%; max-height: 90vh; overflow-y: auto; box-sizing: border-box; border: 1px solid var(--border-color);
        }
        .modal-card h3 { margin: 0 0 14px 0; color: #db2777; font-size: 18px; font-weight: 800; }
        .modal-form { display: flex; flex-direction: column; gap: 10px; }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-group label { font-size: 12px; font-weight: 700; color: var(--text-muted); }
        .form-group input { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-main); font-size: 13px; box-sizing: border-box; outline: none; }
        .form-row { display: flex; gap: 10px; }
        .file-label { color: #111111 !important; }
        .file-input { width: 100%; padding: 6px; font-size: 12px; border: 1px solid var(--border-color); border-radius: 6px; background: var(--input-bg); color: var(--text-main); box-sizing: border-box; }
        .file-status { font-size: 11px; font-weight: 600; margin-top: 2px; }
        .file-status.success { color: #059669; }
        .file-status.error { color: #dc2626; }

        .modal-buttons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
        .btn-cancel { padding: 8px 14px; background: #334155; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; }
        .btn-save { padding: 8px 16px; background: #059669; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; }

        .info-box-card { background: var(--bg-card); padding: 24px; border-radius: 10px; text-align: center; border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 500; }
        .settings-card { background: var(--bg-card); padding: 20px; border-radius: 10px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 14px; max-width: 600px; box-sizing: border-box; }
        .readonly-input { width: 100%; padding: 8px 10px; margin-top: 4px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-muted); font-size: 12px; box-sizing: border-box; }
        .status-success-text { color: #059669; font-size: 12px; font-weight: 700; }
        .loading-state { text-align: center; color: var(--text-muted); padding: 30px; font-weight: 600; }
        .empty-table-cell { padding: 30px; text-align: center; color: var(--text-muted); font-weight: 500; width: 100%; grid-column: 1 / -1; }

        @media (max-width: 992px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.mobile-open { transform: translateX(0); }
          .admin-main-content { margin-left: 0; width: 100vw; padding: 16px; padding-top: 75px; }
          .admin-mobile-header { display: flex; }
        }
         /* --- Professional Flipkart/Amazon Style Add Product Form (Fully Responsive) --- */
.professional-add-product-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  box-sizing: border-box;
  animation: fadeIn 0.25s ease-in-out;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.add-product-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.add-product-header-bar h2 {
  color: var(--text-main);
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 2px 0;
}

.add-product-header-bar p {
  color: var(--text-muted);
  font-size: 11.5px;
  margin: 0;
}

.btn-close-pane {
  background: #334155;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 11.5px;
}

.professional-product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

.form-section-card {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 14px;
  box-sizing: border-box;
  width: 100%;
}

.form-section-card h3 {
  font-size: 13px;
  font-weight: 700;
  color: #db2777;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-row { 
  display: flex; 
  gap: 12px; 
  flex-wrap: wrap; 
  width: 100%;
  box-sizing: border-box;
}

.form-group { 
  display: flex; 
  flex-direction: column; 
  gap: 4px; 
  flex: 1; 
  min-width: 220px; 
  box-sizing: border-box;
  width: 100%;
}

.form-group.full-width-group {
  flex: 100%;
  min-width: 100%;
}

.form-group label { 
  font-size: 11.5px; 
  font-weight: 700; 
  color: var(--text-muted); 
}

.form-group input, 
.file-input { 
  width: 100%; 
  padding: 9px 11px; 
  border-radius: 6px; 
  border: 1px solid var(--border-color); 
  background: var(--bg-card); 
  color: var(--text-main); 
  font-size: 13px; 
  box-sizing: border-box; 
  outline: none; 
}

.tag-input-row {
  display: flex;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.tag-add-btn {
  background: #db2777;
  color: #fff;
  border: none;
  padding: 0 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 12px;
}

.tag-chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  width: 100%;
}

.tag-chip {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 3px 8px;
  border-radius: 16px;
  font-size: 11.5px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #db2777;
  font-weight: 600;
}

.tag-remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc2626;
  font-weight: bold;
  font-size: 13px;
  padding: 0;
}

.tag-helper-text {
  color: var(--text-muted);
  font-size: 11px;
  margin-top: 3px;
  display: block;
}

.image-preview-box {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-thumb {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.preview-text {
  font-size: 11.5px;
  color: #059669;
  font-weight: 650;
}

.form-actions-bar {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 2px solid var(--border-color);
  padding-top: 14px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.btn-cancel-large {
  padding: 9px 18px;
  background: #334155;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
  max-width: 120px;
}

.btn-save-large {
  padding: 9px 20px;
  background: #059669;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(5, 150, 105, 0.2);
  
}

/* Mobile Extra Fixes for full width */
@media (max-width: 768px) {
  .professional-add-product-container {
    padding: 12px;
    margin: 5px;
    width: calc(100% - 10px);
  }
  
  .form-row {
    flex-direction: column;
    gap: 12px;
  }

  .form-group {
    min-width: 100%;
  }

  .btn-cancel-large, .btn-save-large {
    max-width: 100%;
    flex: 100%;
  }
}
      `}</style>
    </div>
  );
};

export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('products');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('default');
  
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     subCategory: '',
//     price: '',
//     tags: '',
//     image: '',
//   });

//   const [users, setUsers] = useState([]);
//   const [usersLoading, setUsersLoading] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('https://trend-nova-product-api-2.onrender.com/api/products');
//       setProducts(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Products fetch error ', error);
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     setUsersLoading(true);
//     try {
//       const response = await axios.get('https://auth-api-gtqf.onrender.com/api/auth/users');
//       setUsers(response.data.users || response.data);
//     } catch (error) {
//       console.error('Users fetch error (Auth API):', error);
//       setUsers([
//         { _id: '1', name: 'Suraj Kumar', email: 'web.devsurajkumar1980@gmail.com', role: 'admin' },
//         { _id: '2', name: 'Demo User', email: 'user@gmail.com', role: 'user' }
//       ]);
//     } finally {
//       setUsersLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`https://trend-nova-product-api-2.onrender.com/api/products/${id}`);
//         setProducts(products.filter((product) => (product._id !== id) && (product.id !== id)));
//         alert('Product deleted successfully from database!');
//       } catch (error) {
//         console.error('Product delete error:', error);
//         alert('Product delete karne mein error aaya.');
//       }
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await axios.delete(`https://auth-api-gtqf.onrender.com/api/auth/users/${userId}`);
//         setUsers(users.filter(u => (u._id !== userId) && (u.id !== userId)));
//         alert('User deleted successfully!');
//       } catch (error) {
//         console.error('User delete error:', error);
//         setUsers(users.filter(u => (u._id !== userId) && (u.id !== userId)));
//         alert('User removed from UI list.');
//       }
//     }
//   };

//   const handleToggleRole = async (userId, currentRole) => {
//     const newRole = currentRole === 'admin' ? 'user' : 'admin';
//     if (window.confirm(`Change user role to ${newRole.toUpperCase()}?`)) {
//       try {
//         await axios.put(`https://auth-api-gtqf.onrender.com/api/auth/users/${userId}`, { role: newRole });
//         setUsers(users.map(u => {
//           if ((u._id === userId) || (u.id === userId)) {
//             return { ...u, role: newRole };
//           }
//           return u;
//         }));
//         alert(`User role updated to ${newRole} successfully!`);
//       } catch (error) {
//         console.error('Role update error:', error);
//         setUsers(users.map(u => {
//           if ((u._id === userId) || (u.id === userId)) {
//             return { ...u, role: newRole };
//           }
//           return u;
//         }));
//       }
//     }
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setFormData(prev => ({ ...prev, image: imageUrl }));
//     }
//   };

//   const handleAddProductSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) {
//       alert('Error: Product image select karna zaroori hai!');
//       return;
//     }

//     try {
//       const newProductPayload = {
//         name: formData.name,
//         category: formData.category,
//         subCategory: formData.subCategory,
//         price: Number(formData.price),
//         tags: formData.tags,
//         image: formData.image,
//         images: [formData.image],
//       };

//       const response = await axios.post('https://trend-nova-product-api-2.onrender.com/api/products', newProductPayload);
//       setProducts([...products, response.data.product || response.data]);
//       setFormData({ name: '', category: '', subCategory: '', price: '', tags: '', image: '' });
//       setShowAddModal(false);
//       alert('Product successfully added!');
//       fetchProducts();
//     } catch (error) {
//       console.error('Product add error:', error);
//       alert('Product add karne mein error aaya.');
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const query = searchTerm.toLowerCase();
//     return (
//       (product.name && product.name.toLowerCase().includes(query)) ||
//       (product.category && product.category.toLowerCase().includes(query)) ||
//       (product.subCategory && product.subCategory.toLowerCase().includes(query)) ||
//       (product.tags && product.tags.toLowerCase().includes(query))
//     );
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === 'price-low-high') return a.price - b.price;
//     if (sortBy === 'price-high-low') return b.price - a.price;
//     if (sortBy === 'name-az') return a.name.localeCompare(b.name);
//     return 0;
//   });

//   return (
//     <div className="admin-layout">
      
//       {/* Mobile Top Navbar */}
//       <div className="admin-mobile-header">
//         <div className="mobile-brand">
//           <div className="brand-logo-box"><i class="fa-solid fa-user-tie"></i></div>
//           <span>Trend<strong>Nova</strong> Admin</span>
//         </div>
//         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-toggle">
//           {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
//         </button>
//       </div>

//       {/* Sidebar Navigation */}
//       <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
//         <div className="sidebar-brand-box">
//           <div className="brand-logo-box">T</div>
//           <div>
//             <h2>Trend<span>Nova</span></h2>
//             <span>Control Center v2.0</span>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           <button onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}>
//             <i class="fa-solid fa-magnifying-glass-chart"></i> Overview
//           </button>
//           <button onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}>
//             <i class="fa-solid fa-box-open"></i> Products
//           </button>
//           <button onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}>
//             <i class="fa-solid fa-users"></i> Users ({users.length})
//           </button>
//           <button onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}>
//             <i class="fa-solid fa-cart-flatbed-suitcase"></i> Orders
//           </button>
//           <button onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }} className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}>
//             <i class="fa-solid fa-code"></i> Settings
//           </button>
//         </nav>

//         <div className="sidebar-footer">
//           <a href="/" className="back-store-btn">← Back to Store</a>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="admin-main-content">
        
//         {activeTab === 'analytics' && (
//           <div className="tab-pane">
//             <div className="section-header">
//               <h1>Dashboard Overview</h1>
//               <p>Live summary of your e-commerce store.</p>
//             </div>
//             <div className="stats-grid">
//               <div className="stat-card products-stat">
//                 <span className="stat-label">TOTAL PRODUCTS</span>
//                 <span className="stat-value">{products.length}</span>
//               </div>
//               <div className="stat-card users-stat">
//                 <span className="stat-label">REGISTERED USERS</span>
//                 <span className="stat-value">{users.length}</span>
//               </div>
              
//             </div>
//           </div>
//         )}

//         {activeTab === 'products' && (
//           <div className="tab-pane">
//             <div className="section-header-flex">
//               <div>
//                 <h2>Products Inventory</h2>
//                 <p>Manage items and pricing</p>
//               </div>
//               <button onClick={() => setShowAddModal(true)} className="btn-primary-green">
//                 + Add Product
//               </button>
//             </div>

//             <div className="toolbar-box">
//               <input 
//                 type="text" 
//                 placeholder="🔍 Search products..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
//                 <option value="default">Sort by: Featured</option>
//                 <option value="price-low-high">Price: Low to High</option>
//                 <option value="price-high-low">Price: High to Low</option>
//                 <option value="name-az">Name: A to Z</option>
//               </select>
//             </div>

//             {showAddModal && (
//               <div className="modal-overlay">
//                 <div className="modal-card">
//                   <h3>Add New Product</h3>
//                   <form onSubmit={handleAddProductSubmit} className="modal-form">
//                     <div className="form-group">
//                       <label>Product Name</label>
//                       <input type="text" required placeholder="e.g. Classic Denim" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Category</label>
//                         <input type="text" required placeholder="e.g. Men" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
//                       </div>
//                       <div className="form-group">
//                         <label>SubCategory</label>
//                         <input type="text" required placeholder="e.g. Jeans" value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} />
//                       </div>
//                     </div>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Price (₹)</label>
//                         <input type="number" required placeholder="1299" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
//                       </div>
//                       <div className="form-group">
//                         <label>Tags</label>
//                         <input type="text" placeholder="casual" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} />
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label className="file-label">Product Image *</label>
//                       <input type="file" accept="image/*" required onChange={handleImageSelect} className="file-input" />
//                       <div className={`file-status ${formData.image ? 'success' : 'error'}`}>
//                         {formData.image ? '✅ Image selected!' : '⚠️ Image required'}
//                       </div>
//                     </div>
//                     <div className="modal-buttons">
//                       <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel">Cancel</button>
//                       <button type="submit" className="btn-save">Save Product</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {loading ? (
//               <div className="loading-state">Loading products...</div>
//             ) : (
//               <div className="products-grid-mobile">
//                 {sortedProducts.length > 0 ? (
//                   sortedProducts.map((product) => (
//                     <div key={product._id || product.id} className="admin-product-card-item">
//                       <img 
//                         src={product.image || (product.images && product.images[0])} 
//                         alt={product.name} 
//                         className="card-item-img" 
//                       />
//                       <div className="card-item-details">
//                         <h4>{product.name}</h4>
//                         <p className="card-meta"><b>Cat:</b> {product.category} / {product.subCategory}</p>
//                         <p className="card-meta"><b>Tags:</b> {product.tags || 'N/A'}</p>
//                         <div className="card-price-action">
//                           <span className="card-price">₹{product.price}</span>
//                           <button onClick={() => handleDelete(product._id || product.id)} className="btn-delete">
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="empty-table-cell">No products found!</div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'users' && (
//           <div className="tab-pane">
//             <div className="section-header">
//               <h2>Users Management</h2>
//               <p>Manage roles & permissions</p>
//             </div>

//             {usersLoading ? (
//               <div className="loading-state">Loading users...</div>
//             ) : (
//               <div className="products-grid-mobile">
//                 {users.length > 0 ? (
//                   users.map((usr) => (
//                     <div key={usr._id || usr.id} className="admin-product-card-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
//                       <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
//                         <span className="user-title">{usr.name || usr.username || 'User'}</span>
//                         <span className={`role-badge ${usr.role === 'admin' ? 'admin' : 'user'}`}>
//                           {usr.role || 'user'}
//                         </span>
//                       </div>
//                       <p className="card-meta" style={{ wordBreak: 'break-all', marginBottom: '4px' }}><b>Email:</b> {usr.email || 'N/A'}</p>
//                       <p className="card-meta" style={{ marginBottom: '12px' }}><b>ID:</b> {usr._id || usr.id}</p>
//                       <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
//                         <button onClick={() => handleToggleRole(usr._id || usr.id, usr.role || 'user')} className="btn-role">
//                           {usr.role === 'admin' ? 'Demote' : 'Make Admin'}
//                         </button>
//                         <button onClick={() => handleDeleteUser(usr._id || usr.id)} className="btn-delete">
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="empty-table-cell">No users found!</div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'orders' && (
//           <div className="tab-pane">
//             <div className="section-header">
//               <h2>Customer Orders</h2>
//               <p>View and fulfill orders</p>
//             </div>
//             <div className="info-box-card">📦 No orders placed yet.</div>
//           </div>
//         )}

//         {activeTab === 'settings' && (
//           <div className="tab-pane">
//             <div className="section-header">
//               <h2>Store Settings</h2>
//               <p>API endpoints configuration</p>
//             </div>
//             <div className="settings-card">
//               <div className="form-group">
//                 <label>Product API</label>
//                 <input type="text" readOnly value="https://trend-nova-product-api-2.onrender.com/api/products" className="readonly-input" />
//               </div>
//               <div className="form-group">
//                 <label>Auth API</label>
//                 <input type="text" readOnly value="https://auth-api-gtqf.onrender.com/api/auth" className="readonly-input" />
//               </div>
//               <div className="status-success-text">✅ Connected securely.</div>
//             </div>
//           </div>
//         )}

//       </main>

//       {/* --- RESPONSIVE STYLES (NO HORIZONTAL SCROLL GUARANTEED) --- */}
//       <style>{`
//         .admin-layout {
//           display: flex;
//           min-height: 100vh;
//           background: #f1f5f9;
//           font-family: 'Inter', system-ui, sans-serif;
//           box-sizing: border-box;
//           width: 100vw;
//           overflow-x: hidden;
//         }

//         .admin-mobile-header {
//           display: none;
//           background: #0f172a;
//           color: #fff;
//           padding: 12px 16px;
//           justify-content: space-between;
//           align-items: center;
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           z-index: 1000;
//           box-sizing: border-box;
//         }
//         .mobile-brand {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-size: 15px;
//         }
//         .mobile-menu-toggle {
//           background: #db2777;
//           color: #fff;
//           border: none;
//           padding: 6px 12px;
//           border-radius: 6px;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .admin-sidebar {
//           width: 260px;
//           background: #0f172a;
//           color: #fff;
//           display: flex;
//           flex-direction: column;
//           position: fixed;
//           height: 100vh;
//           z-index: 999;
//           transition: transform 0.3s ease;
//           box-sizing: border-box;
//           top: 0;
//           left: 0;
//         }

//         .sidebar-brand-box {
//           padding: 20px 16px;
//           border-bottom: 1px solid #1e293b;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//         .brand-logo-box {
//           background: #db2777;
//           color: #fff;
//           width: 34px;
//           height: 34px;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 800;
//           font-size: 16px;
//           flex-shrink: 0;
//         }
//         .sidebar-brand-box h2 {
//           color: #db2777;
//           margin: 0;
//           font-size: 18px;
//           font-weight: 800;
//           line-height: 1.1;
//         }
//         .sidebar-brand-box h2 span { color: #fff; }
//         .sidebar-brand-box span { font-size: 11px; color: #94a3b8; }

//         .sidebar-nav {
//           padding: 16px 10px;
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           flex: 1;
//           overflow-y: auto;
//         }
//         .nav-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 14px;
//           background: transparent;
//           color: #cbd5e1;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           font-weight: 600;
//           font-size: 13px;
//           text-align: left;
//           transition: all 0.2s;
//         }
//         .nav-btn:hover { background: rgba(219, 39, 119, 0.15); color: #fff; }
//         .nav-btn.active { background: #db2777; color: #fff; }

//         .sidebar-footer {
//           padding: 14px 16px;
//           border-top: 1px solid #1e293b;
//         }
//         .back-store-btn {
//           display: block;
//           padding: 10px;
//           background: #1e293b;
//           color: #fff;
//           text-align: center;
//           border-radius: 6px;
//           text-decoration: none;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .admin-main-content {
//           margin-left: 260px;
//           flex: 1;
//           padding: 30px;
//           width: calc(100vw - 260px);
//           box-sizing: border-box;
//           overflow-x: hidden;
//         }

//         .tab-pane { width: 100%; box-sizing: border-box; }

//         .section-header { margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
//         .section-header h1, .section-header h2 { color: #0f172a; margin: 0 0 2px 0; font-size: 22px; font-weight: 800; }
//         .section-header p { color: #64748b; margin: 0; font-size: 12px; }

//         .section-header-flex {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 16px;
//           border-bottom: 2px solid #e2e8f0;
//           padding-bottom: 10px;
//           flex-wrap: wrap;
//           gap: 10px;
//         }
//         .section-header-flex h2 { color: #0f172a; margin: 0 0 2px 0; font-size: 22px; font-weight: 800; }
//         .section-header-flex p { color: #64748b; margin: 0; font-size: 12px; }

//         .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
//         .stat-card { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
//         .products-stat { border-left: 4px solid #db2777; }
//         .users-stat { border-left: 4px solid #059669; }
//         .status-stat { border-left: 4px solid #3b82f6; }
//         .stat-label { font-size: 11px; color: #64748b; font-weight: 700; }
//         .stat-value { font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 6px; display: block; }
//         .stat-value-live { font-size: 15px; font-weight: 700; color: #059669; margin-top: 8px; display: block; }

//         .toolbar-box {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 16px;
//           flex-wrap: wrap;
//           background: #fff;
//           padding: 12px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//         }
//         .search-input {
//           flex: 1;
//           min-width: 180px;
//           padding: 8px 12px;
//           border-radius: 6px;
//           border: 1px solid #cbd5e1;
//           font-size: 13px;
//           outline: none;
//         }
//         .sort-select {
//           padding: 8px 12px;
//           border-radius: 6px;
//           border: 1px solid #cbd5e1;
//           background: #fff;
//           font-size: 13px;
//           outline: none;
//         }

//         .btn-primary-green {
//           padding: 8px 16px;
//           background: #059669;
//           color: #fff;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: 700;
//           font-size: 13px;
//         }
//         .btn-delete {
//           padding: 6px 12px;
//           background: #dc2626;
//           color: #fff;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 11px;
//           font-weight: 600;
//         }
//         .btn-role {
//           padding: 6px 10px;
//           background: #3b82f6;
//           color: #fff;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 11px;
//           font-weight: 600;
//         }

//         /* Responsive Mobile Grid Cards (Replaces awkward side-scroll tables on phones) */
//         .products-grid-mobile {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 16px;
//           width: 100%;
//           box-sizing: border-box;
//         }
//         .admin-product-card-item {
//           background: #fff;
//           border: 1px solid #e2e8f0;
//           border-radius: 10px;
//           padding: 14px;
//           display: flex;
//           gap: 12px;
//           align-items: center;
//           box-sizing: border-box;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.02);
//         }
//         .card-item-img {
//           width: 70px;
//           height: 70px;
//           object-fit: cover;
//           border-radius: 8px;
//           border: 1px solid #cbd5e1;
//           background: #f8fafc;
//           flex-shrink: 0;
//         }
//         .card-item-details { flex: 1; min-width: 0; }
//         .card-item-details h4 {
//           margin: 0 0 4px 0;
//           font-size: 14px;
//           font-weight: 700;
//           color: #0f172a;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .card-meta { margin: 0 0 2px 0; font-size: 12px; color: #64748b; }
//         .card-price-action {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 8px;
//         }
//         .card-price { font-size: 15px; font-weight: 800; color: #059669; }

//         .user-title { font-weight: 700; color: #0f172a; font-size: 14px; }
//         .role-badge { padding: 3px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
//         .role-badge.admin { background: #dbeafe; color: #1d4ed8; }
//         .role-badge.user { background: #f1f5f9; color: #475569; }

//         .modal-overlay {
//           position: fixed;
//           top: 0; left: 0; width: 100%; height: 100%;
//           background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
//           display: flex; justify-content: center; align-items: center;
//           z-index: 10000; padding: 16px; box-sizing: border-box;
//         }
//         .modal-card {
//           background: #fff; padding: 20px; border-radius: 12px;
//           width: 440px; max-width: 100%; max-height: 90vh; overflow-y: auto;
//           box-sizing: border-box;
//         }
//         .modal-card h3 { margin: 0 0 14px 0; color: #db2777; font-size: 18px; font-weight: 800; }
//         .modal-form { display: flex; flex-direction: column; gap: 10px; }
//         .form-group { display: flex; flex-direction: column; gap: 4px; }
//         .form-group label { font-size: 12px; font-weight: 700; color: #475569; }
//         .form-group input { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px; box-sizing: border-box; outline: none; }
//         .form-row { display: flex; gap: 10px; }
//         .file-label { color: #dc2626 !important; }
//         .file-input { width: 100%; padding: 6px; font-size: 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; box-sizing: border-box; }
//         .file-status { font-size: 11px; font-weight: 600; margin-top: 2px; }
//         .file-status.success { color: #059669; }
//         .file-status.error { color: #dc2626; }

//         .modal-buttons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
//         .btn-cancel { padding: 8px 14px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; }
//         .btn-save { padding: 8px 16px; background: #059669; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; }

//         .info-box-card { background: #fff; padding: 24px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0; color: #64748b; font-weight: 500; }
//         .settings-card { background: #fff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 14px; max-width: 600px; box-sizing: border-box; }
//         .readonly-input { width: 100%; padding: 8px 10px; margin-top: 4px; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; color: #64748b; font-size: 12px; box-sizing: border-box; }
//         .status-success-text { color: #059669; font-size: 12px; font-weight: 700; }
//         .loading-state { text-align: center; color: #64748b; padding: 30px; font-weight: 600; }
//         .empty-table-cell { padding: 30px; text-align: center; color: #64748b; font-weight: 500; width: 100%; grid-column: 1 / -1; }

//         /* Mobile Viewport Adaptation */
//         @media (max-width: 992px) {
//           .admin-sidebar { transform: translateX(-100%); }
//           .admin-sidebar.mobile-open { transform: translateX(0); }
//           .admin-main-content { margin-left: 0; width: 100vw; padding: 16px; padding-top: 75px; }
//           .admin-mobile-header { display: flex; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminDashboard;// import React, { useState, useEffect } from 'react';
