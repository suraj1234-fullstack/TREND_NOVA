import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Herosection from './components/herosection';
import Footersection from './components/footersection';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 1. Agar search query khali hai, toh search mat karo
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const url = `https://trend-nova-product-api-2.onrender.com/api/products/search?q=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div>
      {/* Navbar */}
      <Navbar onSearchChange={(query) => setSearchQuery(query)} />

      {/* Main Content Area */}
      {searchQuery.trim() === '' ? (
        
        /* --- BINA SEARCH KIYE YE HERO SECTION DIKHEGA --- */
        <div ><Herosection/></div>

      ) : (

        /* --- JAISE HI USER SEARCH KAREGA, YE SEARCH RESULTS DIKHENGE --- */
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
          <h2>Search Results for "{searchQuery}"</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <div key={product._id || product.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <img 
                    src={product.image || 'https://via.placeholder.com/150'} 
                    alt={product.name} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }} 
                  />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '10px 0 6px 0', color: '#111827' }}>{product.name}</h3>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#db2777' }}>₹{product.price}</p>
                </div>
              ))
            ) : (
              <p style={{ color: '#6b7280' }}>No products found for "{searchQuery}".</p>
            )}
          </div>
        </div>

      )}
      <Footersection/>
    </div>
  );
};

export default App;