import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'brands'
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categoriesData = {
    Men: {
      categories: [
        {
          title: "Topwear",
          items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Polos", "Sweatshirts", "Hoodies", "Jackets", "Sweaters", "Blazings & Coats", "Suits", "Oversized Tees", "Tank Tops", "Thermals"]
        },
        {
          title: "Bottomwear",
          items: ["Jeans", "Casual Trousers", "Formal Trousers", "Track Pants", "Shorts", "Cargo Pants", "Joggers", "Chinos", "Pyjamas", "Boxers", "Swimwear"]
        },
        {
          title: "Footwear",
          items: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Loafer Shoes", "Boots", "Running Shoes", "Ethnic Footwear", "Slippers"]
        },
        {
          title: "Indian & Festive Wear",
          items: ["Kurtas & Kurta Sets", "Sherwanis", "Nehru Jackets", "Dhotis", "Ethnic Jackets", "Pathani Suits"]
        },
        {
          title: "Innerwear & Sleepwear",
          items: ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Loungewear", "Thermals"]
        },
        {
          title: "Accessories & Grooming",
          items: ["Watches", "Belts & Wallets", "Sunglasses", "Caps & Hats", "Backpacks", "Luggage & Bags", "Perfumes & Deos", "Beard Care", "Trimmers", "Jewellery & Cufflinks", "Tie & Pocket Squares", "Socks"]
        }
      ],
      brands: [
        {
          title: "Top Clothing Brands",
          items: ["Nike", "Adidas", "Puma", "Levi's", "Tommy Hilfiger", "Calvin Klein", "U.S. Polo Assn.", "Jack & Jones", "Zara", "H&M", "Roadster", "HRX", "Wrangler", "Pepe Jeans", "Allen Solly", "Van Heusen", "Peter England", "Louis Philippe", "Arrow", "Park Avenue", "Raymond", "Mufti", "Being Human", "Flying Machine", "Superdry", "U.S. Polo Assn. Denim", "United Colors of Benetton"]
        },
        {
          title: "Footwear & Sportswear Brands",
          items: ["Puma", "Nike", "Adidas Originals", "Reebok", "New Balance", "Skechers", "Asics", "Woodland", "Bata", "Red Tape", "Red Chief", "Lee Cooper", "Crocs", "Sparx", "Campus", "Fila", "Under Armour", "Converse", "Vans", "Clarks"]
        },
        {
          title: "Grooming & Accessories Brands",
          items: ["Fastrack", "Fossil", "Casio", "Titan", "Sonata", "Ray-Ban", "Oakley", "Wildcraft", "American Tourister", "Beardo", "The Man Company", "Ustraa", "Bombay Shaving Company", "Nivea Men", "Gillette"]
        }
      ]
    },
    Women: {
      categories: [
        {
          title: "Indian & Fusion Wear",
          items: ["Kurtas & Suits", "Kurtis, Tunics & Tops", "Sarees", "Ethnic Wear Sets", "Lehenga Cholis", "Dupattas & Shawls", "Dress Materials", "Palazzos & Salwars", "Leggings & Churidars", "Ethnic Jackets", "Blouses"]
        },
        {
          title: "Western Wear",
          items: ["Dresses", "Tops & Tees", "Jeans", "Trousers & Capris", "Shorts & Skirts", "Co-ords", "Jumpsuits", "Shrugs & Kimonos", "Sweaters & Sweatshirts", "Jackets & Coats", "Blazers"]
        },
        {
          title: "Footwear",
          items: ["Flats & Sandals", "Heels & Wedges", "Casual Shoes", "Sports Shoes & Sneakers", "Boots", "Ballerinas", "Flip Flops", "Ethnic Footwear", "Kolhapuris"]
        },
        {
          title: "Lingerie & Sleepwear",
          items: ["Bras & Bralettes", "Briefs & Panties", "Shapewear", "Sleepwear & Loungewear", "Nighties & Robes", "Camisoles & Slips", "Thermals"]
        },
        {
          title: "Handbags & Accessories",
          items: ["Handbags", "Tote Bags", "Sling Bags", "Clutches & Wallets", "Backpacks", "Sunglasses", "Watches", "Belts", "Scarves & Stoles", "Hair Accessories"]
        },
        {
          title: "Jewellery",
          items: ["Fashion Jewellery", "Fine Jewellery", "Earrings", "Necklaces & Pendants", "Bangles & Bracelets", "Rings", "Anklets", "Nose Rings"]
        }
      ],
      brands: [
        {
          title: "Ethnic & Fusion Brands",
          items: ["Biba", "W for Woman", "Aurelia", "FabIndia", "Global Desi", "Anouk", "Sangria", "Libas", "Rangriti", "Indya", "Soch", "Chhabra 555", "Manyavar Mohey"]
        },
        {
          title: "Western Wear Brands",
          items: ["Zara", "H&M", "Mango", "Forever 21", "VERO MODA", "ONLY", "AND", "Tokyo Talkies", "SASSAFRAS", "DressBerry", "Street 9", "Urbanic", "Levis", "Harpa", "Rheson", "Allen Solly Woman"]
        },
        {
          title: "Footwear & Bags Brands",
          items: ["Metro", "Mochi", "Catwalk", "Inc.5", "Bata", "Caprese", "Lavie", "Baggit", "Lino Perros", "Aldo", "Hidesign", "Zouk", "Gini & Jony"]
        }
      ]
    },
    Kids: {
      categories: [
        {
          title: "Boys Clothing",
          items: ["T-Shirts & Polos", "Shirts", "Jeans & Trousers", "Shorts & 3/4ths", "Ethnic Wear", "Track Pants & Joggers", "Sweaters & Sweatshirts", "Jackets", "Innerwear & Thermals", "Nightwear"]
        },
        {
          title: "Girls Clothing",
          items: ["Dresses & Frocks", "Tops & Tees", "Lehenga Cholis & Ethnic", "Jeans & Jeggings", "Shorts & Skirts", "Trousers & Capris", "Jumpsuits & Dungarees", "Innerwear", "Nightwear", "Co-ord Sets"]
        },
        {
          title: "Infants (0-2 Years)",
          items: ["Rompers & Onesies", "Clothing Sets", "Infant Ethnic Wear", "T-Shirts & Tops", "Bottom Wear", "Winter Wear", "Infant Footwear", "Bibs & Mittens", "Swaddles & Blankets"]
        },
        {
          title: "Kids Footwear",
          items: ["Casual Shoes", "Sports Shoes", "Sandals & Floaters", "Flip Flops & Slippers", "Boots", "Ballerinas", "School Shoes"]
        },
        {
          title: "Toys & Baby Care",
          items: ["Soft Toys", "Educational Toys", "Action Figures & Dolls", "Board Games & Puzzles", "Remote Control Toys", "Diapers & Wipes", "Baby Bath & Skin", "Feeding & Nursing", "Strollers & Prams"]
        },
        {
          title: "School Supplies & Accessories",
          items: ["School Bags", "Lunch Boxes", "Water Bottles", "Pencil Boxes & Stationery", "Watches", "Caps & Sunglasses"]
        }
      ],
      brands: [
        {
          title: "Top Kids Fashion Brands",
          items: ["Mothercare", "FirstClub", "Gini & Jony", "US Polo Kids", "U.S. Polo Assn. Kids", "Allen Solly Junior", "Peppermint", "Hopscotch", "Nauti Nati", "Max Kids", "Pantaloons Junior", "H&M Kids", "Marks & Spencer Kids"]
        },
        {
          title: "Footwear & Toys Brands",
          items: ["Puma Kids", "Adidas Kids", "Nike Kids", "Crocs Kids", "Lego", "Barbie", "Hot Wheels", "Fisher-Price", "Nerf", "Chicco", "Pampers", "Mee Mee", "Himalaya Baby", "Sebamed"]
        }
      ]
    },
    Beauty: {
      categories: [
        {
          title: "Makeup",
          items: ["Lipstick & Lip Gloss", "Foundation & Concealer", "Kajal & Eyeliner", "Mascara", "Compact & Loose Powder", "Blush & Highlighter", "Eye Shadow", "Primer & Setting Spray", "Makeup Brushes & Sponges", "Nail Polish & Care"]
        },
        {
          title: "Skincare",
          items: ["Face Wash & Cleansers", "Moisturizers & Face Creams", "Sunscreens", "Serums & Essences", "Face Masks & Sheets", "Toners & Mists", "Eye Creams", "Lip Balms", "Body Lotions", "Scrubs & Exfoliators"]
        },
        {
          title: "Haircare",
          items: ["Shampoos & Conditioners", "Hair Oils & Serums", "Hair Masks & Spa", "Hair Color", "Hair Styling Products", "Scalp Treatments", "Hair Fall Control"]
        },
        {
          title: "Fragrances & Bath",
          items: ["Perfumes (EDP/EDT)", "Deodorants & Body Sprays", "Body Mists", "Shower Gels & Body Wash", "Soaps & Bath Salts", "Hand & Foot Care"]
        },
        {
          title: "Grooming Appliances",
          items: ["Hair Dryers", "Hair Straighteners", "Hair Curlers", "Trimmers & Shavers", "Epilators", "Face Cleansing Devices"]
        },
        {
          title: "Men's Grooming",
          items: ["Beard Oils & Washes", "Shaving Creams & Foams", "Aftershave Lotions", "Men's Face Wash", "Men's Perfumes"]
        }
      ],
      brands: [
        {
          title: "Top Makeup Brands",
          items: ["Maybelline New York", "L'Oreal Paris", "M.A.C", "Lakme", "SUGAR Cosmetics", "Nykaa Cosmetics", "Kay Beauty", "Faces Canada", "Colorbar", "Rimmel", "REVLON", "Swiss Beauty", "Insight Cosmetics"]
        },
        {
          title: "Top Skincare & Haircare Brands",
          items: ["The Ordinary", "Minimalist", "Mamaearth", "Cetaphil", "Neutrogena", "Plum", "Dot & Key", "Lotus Herbals", "Biotique", "Forest Essentials", "Derma Co", "Tresemme", "Dove", "Matrix", "Schwarzkopf"]
        },
        {
          title: "Fragrance & Appliances Brands",
          items: ["Philips", "Nova", "VEGA", "Dyson", "Havells", "Titan Skinn", "Davidoff", "Calvin Klein Perfumes", "Jaguar", "Nivea", "Axe", "Old Spice"]
        }
      ]
    },
    "Home & Kitchen": {
      categories: [
        {
          title: "Bed Linen & Furnishing",
          items: ["Bedsheets & Pillow Covers", "Blankets, Quilts & Dohars", "Pillows & Cushions", "Cushion Covers", "Curtains & Drapes", "Mattress Protectors", "Rugs & Carpets", "Door Mats"]
        },
        {
          title: "Kitchen & Dining",
          items: ["Cookware & Sets", "Pressure Cookers", "Serveware & Dinnerware", "Glasses & Drinkware", "Cutlery Sets", "Storage Containers & Jars", "Lunch Boxes & Bottles", "Kitchen Tools & Knives", "Bakeware"]
        },
        {
          title: "Home Decor & Lighting",
          items: ["Wall Art & Paintings", "Clocks", "Vases & Flowers", "Candles & Holders", "Showpieces & Figurines", "Mirrors", "Ceiling Lights & Lamps", "Wall Lights", "String Lights"]
        },
        {
          title: "Home Appliances",
          items: ["Mixer Grinders", "Juicers & Blenders", "Electric Kettles", "Air Fryers", "Microwave Ovens", "Toasters & Sandwich Makers", "Water Purifiers", "Vacuum Cleaners", "Irons & Steamers"]
        },
        {
          title: "Storage & Organization",
          items: ["Cloth Organizers", "Shoe Racks", "Laundry Baskets", "Bathroom Shelves", "Kitchen Racks & Holders", "Wardrobe Organizers"]
        },
        {
          title: "Bath & Cleaning",
          items: ["Bath Towels & Hand Towels", "Bathroom Accessories", "Mops & Brooms", "Cleaning Supplies", "Trash Cans & Bins"]
        }
      ],
      brands: [
        {
          title: "Furnishing & Decor Brands",
          items: ["Bombay Dyeing", "Spaces", "D'Decor", "Story@Home", "Home Centre", "IKEA", "Portico New York", "Raymond Home", "Kuber Industries", "Solimo"]
        },
        {
          title: "Kitchenware Brands",
          items: ["Prestige", "Hawkins", "Pigeon", "Milton", "Cello", "Borosil", "Wonderchef", "Butterfly", "Stahl", "Vinod Cookware", "Corelle"]
        },
        {
          title: "Appliances Brands",
          items: ["Philips", "Bajaj", "Morphy Richards", "Kent", "Kent", "Usha", "Havells", "Crompton", "Panasonic", "Eureka Forbes", "Bosch"]
        }
      ]
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setActiveDropdown(null);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          
          {/* Logo */}
          <a href="/" className="nav-logo">
            Trend<span className="logo-highlight">Nova</span>
          </a>

          {/* Desktop Mega-Menu Nav Items */}
          <div className="nav-links">
            {Object.keys(categoriesData).map((catName) => (
              <div 
                key={catName} 
                className="nav-item-dropdown"
                onMouseEnter={() => {
                  setActiveDropdown(catName);
                  setActiveTab('categories');
                }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`nav-link-btn ${activeDropdown === catName ? 'active' : ''}`}>
                  <span>{catName}</span>
                  <svg className={`arrow-icon ${activeDropdown === catName ? 'rotate' : ''}`} width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega Dropdown Panel */}
                {activeDropdown === catName && (
                  <div className="mega-dropdown-box">
                    
                    {/* Inner Navigation Tabs (Categories vs Brands) */}
                    <div className="mega-menu-tabs">
                      <button 
                        className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('categories')}
                      >
                        📂 Categories ({categoriesData[catName].categories.reduce((acc, c) => acc + c.items.length, 0)}+ Items)
                      </button>
                      <button 
                        className={`tab-btn ${activeTab === 'brands' ? 'active' : ''}`}
                        onClick={() => setActiveTab('brands')}
                      >
                        🏷️ Top Brands ({categoriesData[catName].brands.reduce((acc, b) => acc + b.items.length, 0)}+ Brands)
                      </button>
                    </div>

                    {/* Tab Content Display */}
                    <div className="mega-menu-content">
                      {activeTab === 'categories' ? (
                        <div className="mega-grid-container">
                          {categoriesData[catName].categories.map((group, idx) => (
                            <div key={idx} className="mega-column">
                              <h4 className="mega-group-title">{group.title}</h4>
                              <ul className="mega-item-list">
                                {group.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <a 
                                      href={`/search?q=${encodeURIComponent(item)}`}
                                      className="mega-item-link"
                                    >
                                      {item}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mega-grid-container brands-grid">
                          {categoriesData[catName].brands.map((group, idx) => (
                            <div key={idx} className="mega-column">
                              <h4 className="mega-group-title brand-title">{group.title}</h4>
                              <ul className="mega-item-list brand-list">
                                {group.items.map((brand, brandIdx) => (
                                  <li key={brandIdx}>
                                    <a 
                                      href={`/search?q=${encodeURIComponent(brand)}`}
                                      className="mega-item-link brand-link"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mega-footer-bar">
                      <span>Explore complete {catName} collection with instant filter options.</span>
                      <a href={`/search?q=${encodeURIComponent(catName)}`} className="view-all-link">View All {catName} →</a>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Action Icons & Search */}
          <div className="nav-actions">
            
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="search-group desktop-search">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="search-input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-submit-btn" aria-label="Search">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </button>
            </form>

            {/* --- CHHOTA SA DARK / LIGHT MODE TOGGLE BUTTON --- */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-icon-btn"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {darkMode ? '☀︎' : '⏾'}
            </button>

            <a href="#signin" className="action-item signin-desktop">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </a>

            <a href="#cart" className="action-item cart-wrapper" title="View Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="cart-badge">0</span>
            </a>

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

        {/* Mobile Search Row */}
        <div className="mobile-search-always-bar">
          <form onSubmit={handleSearchSubmit} className="search-group mobile-always-search">
            <input
              type="text"
              placeholder="Search products & brands..."
              className="search-input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn" aria-label="Search">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile Accordion Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          
          {/* Mobile Theme Toggle Button inside menu */}
          <div className="mobile-extra-controls">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-icon-btn mobile-theme-btn"
            >
              {darkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>
          </div>

          <div className="mobile-nav-links">
            {Object.keys(categoriesData).map((catName) => (
              <details key={catName} className="mobile-category-block">
                <summary className="mobile-cat-title">{catName}</summary>
                <div className="mobile-accordion-body">
                  <div className="mobile-sub-section">
                    <div className="mobile-sub-heading">Categories</div>
                    {categoriesData[catName].categories.map((group, idx) => (
                      <div key={idx} className="mobile-group-box">
                        <strong>{group.title}</strong>
                        <div className="mobile-items-wrap">
                          {group.items.slice(0, 6).map((item, itemIdx) => (
                            <a 
                              key={itemIdx} 
                              href={`/search?q=${encodeURIComponent(item)}`}
                              onClick={() => setIsOpen(false)}
                              className="mobile-sub-link"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mobile-sub-section">
                    <div className="mobile-sub-heading brand-heading">Popular Brands</div>
                    <div className="mobile-items-wrap">
                      {categoriesData[catName].brands.flatMap(b => b.items).slice(0, 10).map((brand, bIdx) => (
                        <a 
                          key={bIdx}
                          href={`/search?q=${encodeURIComponent(brand)}`}
                          onClick={() => setIsOpen(false)}
                          className="mobile-sub-link brand-sub-link"
                        >
                          {brand}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <a href="#signin" onClick={() => setIsOpen(false)} className="mobile-signin-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Sign In </span>
          </a>
        </div>
      </nav>

      {/* Embedded Modern Styling */}
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          background-color: #ffffff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .nav-container {
          max-width: 1420px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
        }
        .nav-logo {
          font-size: 24px;
          font-weight: 900;
          color: #0f172a;
          text-decoration: none;
          letter-spacing: -0.5px;
        }
        .logo-highlight {
          color: #db2777;
        }
        .nav-links {
          display: flex;
          gap: 28px;
        }
        .nav-item-dropdown {
          position: relative;
          padding-bottom: 12px; /* Fixes hover gap */
        }
        .nav-link-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          padding: 10px 0;
          transition: color 0.2s;
        }
        .nav-link-btn:hover, .nav-link-btn.active {
          color: #db2777;
        }
        .arrow-icon {
          transition: transform 0.25s ease;
        }
        .arrow-icon.rotate {
          transform: rotate(180deg);
        }

        /* Full Width Mega Dropdown Box with bridge padding */
        .mega-dropdown-box {
          position: fixed;
          top: 58px; /* Perfectly aligned right below navbar */
          left: 50%;
          transform: translateX(-50%);
          width: 92vw;
          max-width: 1320px;
          background: #ffffff;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          z-index: 1000;
          animation: megaFadeIn 0.15s ease-out;
          padding-top: 5px; /* Invisible gap bridge */
        }

        @keyframes megaFadeIn {
          from { opacity: 0; transform: translate(-50%, 5px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        /* Tabs Header inside Mega Menu */
        .mega-menu-tabs {
          display: flex;
          gap: 12px;
          padding: 12px 24px;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .tab-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active, .tab-btn:hover {
          background: #db2777;
          color: #ffffff;
          border-color: #db2777;
          box-shadow: 0 3px 8px rgba(219, 39, 119, 0.25);
        }

        /* Content Grid */
        .mega-menu-content {
          padding: 24px;
          max-height: 480px;
          overflow-y: auto;
        }
        .mega-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 24px;
        }
        .mega-column {
          display: flex;
          flex-direction: column;
        }
        .mega-group-title {
          font-size: 13px;
          font-weight: 700;
          color: #db2777;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 10px 0;
          padding-bottom: 4px;
          border-bottom: 1.5px solid #fce7f3;
        }
        .mega-group-title.brand-title {
          color: #0284c7;
          border-bottom-color: #e0f2fe;
        }
        .mega-item-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mega-item-link {
          color: #475569;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-block;
        }
        .mega-item-link:hover {
          color: #db2777;
          transform: translateX(3px);
        }
        .mega-item-link.brand-link:hover {
          color: #0284c7;
        }

        .mega-footer-bar {
          background-color: #f1f5f9;
          padding: 10px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
        }
        .view-all-link {
          color: #db2777;
          font-weight: 700;
          text-decoration: none;
        }
        .view-all-link:hover {
          text-decoration: underline;
        }

        /* Search & Action Right Bar */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .search-group {
          display: flex;
          align-items: center;
          background-color: #f1f5f9;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 3px 4px 3px 14px;
          transition: all 0.25s ease;
          width: 280px;
        }
        .search-group:focus-within {
          border-color: #db2777;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(219, 39, 119, 0.12);
        }
        .search-input-field {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          color: #0f172a;
          width: 100%;
        }
        .search-submit-btn {
          background: linear-gradient(135deg, #db2777 0%, #be185d 100%);
          color: #ffffff;
          border: none;
          border-radius: 20px;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(219, 39, 119, 0.25);
        }

        /* --- CHHOTA SA GOL ICON BUTTON STYLING --- */
        .theme-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .theme-icon-btn:hover {
          transform: scale(1.1);
          background: #f1f5f9;
        }

        .mobile-extra-controls {
          display: none;
        }
        .mobile-search-always-bar {
          display: none;
        }
        .action-item {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: #334155;
          font-size: 14px;
          font-weight: 600;
        }
        .cart-wrapper {
          position: relative;
        }
        .cart-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background-color: #db2777;
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          padding: 1px 6px;
          border-radius: 10px;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #0f172a;
        }
        .mobile-menu {
          display: none;
        }

        /* Responsive Mobile Drawer */
        @media (max-width: 980px) {
          .nav-links, .desktop-search, .signin-desktop {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .mobile-search-always-bar {
            display: block;
            padding: 0 14px 10px 14px;
            background-color: #ffffff;
            border-bottom: 1px solid #f1f5f9;
          }
          .mobile-always-search {
            width: 100% !important;
            box-sizing: border-box;
          }
          .mobile-menu.open {
            display: block;
            position: fixed;
            top: 106px;
            left: 0;
            width: 100%;
            height: calc(100vh - 106px);
            background: #ffffff;
            overflow-y: auto;
            padding: 16px;
            box-sizing: border-box;
            z-index: 999;
          }
          .mobile-extra-controls {
            display: block;
            margin-bottom: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f1f5f9;
          }
          .mobile-theme-btn {
            width: 100%;
            height: 40px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            justify-content: center;
          }
          .mobile-category-block {
            border-bottom: 1px solid #f1f5f9;
            padding: 10px 0;
          }
          .mobile-cat-title {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            cursor: pointer;
          }
          .mobile-accordion-body {
            padding: 10px 0;
          }
          .mobile-sub-heading {
            font-size: 12px;
            font-weight: 700;
            color: #db2777;
            text-transform: uppercase;
            margin: 8px 0;
          }
          .mobile-sub-heading.brand-heading {
            color: #0284c7;
          }
          .mobile-group-box {
            margin-bottom: 8px;
            font-size: 13px;
          }
          .mobile-items-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 4px;
          }
          .mobile-sub-link {
            font-size: 12px;
            color: #475569;
            background: #f1f5f9;
            padding: 4px 10px;
            border-radius: 12px;
            text-decoration: none;
          }
          .mobile-sub-link.brand-sub-link {
            background: #e0f2fe;
            color: #0369a1;
          }
          
          /* --- FIXED & STYLISH FULL-WIDTH SIGN-IN BUTTON --- */
          .mobile-signin-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            background: linear-gradient(135deg, #db2777 0%, #be185d 100%);
            color: #ffffff !important;
            padding: 14px 20px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            margin-top: 24px;
            box-shadow: 0 4px 12px rgba(219, 39, 119, 0.35);
            box-sizing: border-box;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;