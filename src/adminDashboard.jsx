import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Backend API se saare products fetch karne ka function
  const fetchProducts = async () => {
    try {
      // Yahan apni product API ka URL daal dena (jaise http://localhost:5000/api/products)
      const response = await axios.get('https://trend-nova-product-api-2.onrender.com/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Products fetch error ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Product Delete karne ka function
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete product')) {
      try {
        await axios.delete(`https://trend-nova-product-api-2.onrender.com/api/products/${id}`);
        // State se turant hata do taaki page refresh kiye bina list update ho jaye
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Product delete karne mein error aaya:', error);
      }
    }
  };

  // 3. Product Update karne ke liye edit page ya modal par redirect karna
  const handleUpdate = (id) => {
    navigate(`/admin/update-product/${id}`); // Apne route ke hisaab se ise adjust kar lena
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Admin Panel - Product Management</h2>

      {loading ? (
        <p>Products load ho rahe hain...</p>
      ) : (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', color: '#475569', fontSize: '13px' }}>Product Name</th>
                <th style={{ padding: '12px 16px', color: '#475569', fontSize: '13px' }}>Rate / Price</th>
                <th style={{ padding: '12px 16px', color: '#475569', fontSize: '13px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id || product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '14px 16px', fontWeight: '500', color: '#0f172a' }}>
                      {product.name}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#059669', fontWeight: '600' }}>
                      ₹{product.price}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleUpdate(product._id || product.id)}
                        style={{ padding: '6px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id || product.id)}
                        style={{ padding: '6px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                    Koi product nahi mila!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;