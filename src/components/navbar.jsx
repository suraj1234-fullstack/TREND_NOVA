import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'brands'
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- VOICE SEARCH STATE ---
  const [isListening, setIsListening] = useState(false);
  
  // --- SCROLL SHRINK STATE FOR SUB-BAR ---
  const [isScrolled, setIsScrolled] = useState(false);

  // --- DYNAMIC SCROLL BACKGROUND COLOR LOGIC (6 Colors) ---
  const [navBg, setNavBg] = useState('#ffffff');
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic Theme Body Sync (Ensures Chat Assistant & Web Page stays perfectly themed)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Scroll detect for hiding icons / shrinking bar
      if (scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (scrollY > 2400) {
        setNavBg('#fbcfe8'); // 6th Color (Footer ke paas): Soft Pink/Rose
      } else if (scrollY > 1900) {
        setNavBg('#fef6aa'); // 5th Color: Warm Peach / Orange
      } else if (scrollY > 1400) {
        setNavBg('#fef08a'); // 4th Color: Bright Lemon Yellow
      } else if (scrollY > 900) {
        setNavBg('#bbf7d0'); // 3rd Color: Clean Green
      } else if (scrollY > 400) {
        setNavBg('#bfdbfe'); // 2nd Color: Visible Blue
      } else if (scrollY > 100) {
        setNavBg('#e2e8f0'); // 1st Color: Light Slate Grey
      } else {
        setNavBg('#ffffff'); // Ekdum Top par: Clean White
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Flipkart Style Categories Data for the new bar below navbar
  const subCategoriesList = [
    { title: 'Fashion', icon: <i className="fa-solid fa-vest"></i>, link: '/search?q=fashion' },
    { title: 'Mobiles', icon: <i className="fa-solid fa-mobile-screen-button"></i>, link: '/search?q=mobiles' },
    { title: 'Electronics', icon: <i className="fa-solid fa-tv"></i>, link: '/search?q=electronics' },
    { title: 'Beauty', icon: <i className="fa-solid fa-venus-double"></i>, link: '/search?q=beauty' },
    { title: 'Home', icon: <i className="fa-solid fa-house-chimney"></i>, link: '/search?q=home' },
    { title: 'Appliances', icon:<i className="fa-solid fa-bolt"></i>, link: '/search?q=appliances' },
    { title: 'Toys', icon: <i className="fa-solid fa-cubes-stacked"></i>, link: '/search?q=toys' },
    { title: 'Grocery', icon: <i className="fa-solid fa-basket-shopping"></i>, link: '/search?q=grocery' },
    { title: 'Two Wheelers', icon:<i className="fa-solid fa-motorcycle"></i>, link: '/search?q=two-wheelers' }
  ];

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

  // --- VOICE SEARCH HANDLER FUNCTION ---
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser does not support voice recognition. Try using Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSearchQuery(speechToText);
      setIsListening(false);
      
      if (speechToText.trim()) {
        navigate(`/search?q=${encodeURIComponent(speechToText.trim())}`);
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <nav 
        className="navbar" 
        style={{ 
          backgroundColor: navBg, 
          transition: 'background-color 0.5s ease-in-out' 
        }}
      >
        <div className="nav-container">
          
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="nav-logo" aria-label="TrendNova home">
            <span className="logo-mark" aria-hidden="true">T</span>
            <span className="logo-wordmark">Trend<span className="logo-highlight">Nova</span></span>
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
                                    <span 
                                      onClick={() => {
                                        navigate(`/search?q=${encodeURIComponent(item)}`);
                                        setActiveDropdown(null);
                                      }}
                                      className="mega-item-link"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {item}
                                    </span>
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
                                    <span 
                                      onClick={() => {
                                        navigate(`/search?q=${encodeURIComponent(brand)}`);
                                        setActiveDropdown(null);
                                      }}
                                      className="mega-item-link brand-link"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {brand}
                                    </span>
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
                      <span 
                        onClick={() => {
                          navigate(`/search?q=${encodeURIComponent(catName)}`);
                          setActiveDropdown(null);
                        }} 
                        className="view-all-link"
                        style={{ cursor: 'pointer' }}
                      >
                        View All {catName} →
                      </span>
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
                placeholder="Search for Products, Brands and More"
                className="search-input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* VOICE SPEAKER BUTTON */}
              <button 
                type="button" 
                onClick={handleVoiceSearch} 
                className={`voice-search-btn ${isListening ? 'listening' : ''}`}
                title="Search by Voice"
                aria-label="Search by Voice"
              >
                <i className="fa-solid fa-microphone"></i>
              </button>

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

            <span onClick={() => navigate('/signin')} className="action-item signin-desktop" style={{ cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </span>

            <span onClick={() => navigate('/cart')} className="action-item cart-wrapper" title="View Cart" style={{ cursor: 'pointer' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="cart-badge">0</span>
            </span>

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
        <div 
          className="mobile-search-always-bar"
          style={{ 
            backgroundColor: navBg, 
            transition: 'background-color 0.5s ease-in-out' 
          }}
        >
          <form onSubmit={handleSearchSubmit} className="search-group mobile-always-search">
            <input
              type="text"
              placeholder="Search products & brands..."
              className="search-input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button 
              type="button" 
              onClick={handleVoiceSearch} 
              className={`voice-search-btn ${isListening ? 'listening' : ''}`}
              title="Search by Voice"
            >
              <i className="fa-solid fa-microphone"></i>
            </button>

            <button type="submit" className="search-submit-btn" aria-label="Search">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile Accordion Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          
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
                            <span 
                              key={itemIdx} 
                              onClick={() => {
                                navigate(`/search?q=${encodeURIComponent(item)}`);
                                setIsOpen(false);
                              }}
                              className="mobile-sub-link"
                              style={{ cursor: 'pointer' }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mobile-sub-section">
                    <div className="mobile-sub-heading brand-heading">Popular Brands</div>
                    <div className="mobile-items-wrap">
                      {categoriesData[catName].brands.flatMap(b => b.items).slice(0, 10).map((brand, bIdx) => (
                        <span 
                          key={bIdx}
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(brand)}`);
                            setIsOpen(false);
                          }}
                          className="mobile-sub-link brand-sub-link"
                          style={{ cursor: 'pointer' }}
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <span onClick={() => { navigate('/signin'); setIsOpen(false); }} className="mobile-signin-btn" style={{ cursor: 'pointer', display: 'flex' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Sign In </span>
          </span>
        </div>

        {/* --- DYNAMIC SMART SUB-CATEGORIES BAR (COLLAPSES ON SCROLL) --- */}
        {location.pathname === '/' && (
          <div className={`sub-categories-bar ${darkMode ? 'dark-sub-bar' : ''} ${isScrolled ? 'scrolled-sub-bar' : ''}`}>
            <div className="sub-categories-track">
              {subCategoriesList.map((cat, index) => (
                <span key={index} onClick={() => navigate(cat.link)} className="sub-cat-item" style={{ cursor: 'pointer' }}>
                  <div className={`sub-cat-icon-box ${darkMode ? 'dark-icon-box' : ''}`}>
                    <span className="sub-cat-emoji">{cat.icon}</span>
                  </div>
                  <span className={`sub-cat-name ${darkMode ? 'dark-text' : ''}`}>{cat.title}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Embedded Modern Styling */}
      <style>{`
        * { box-sizing: border-box; }
        
        /* Perfect Body Top Padding to avoid content overlap */
        body {
          padding-top: 80px; /* Desktop height */
        }
        @media (max-width: 980px) {
          body {
            padding-top: 125px; /* Mobile height */
          }
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          color: #0f172a;
          box-shadow: 0 2px 14px rgba(15, 23, 42, 0.07);
          z-index: 1000;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .nav-container {
          width: 100%;
          max-width: 1600px;
          min-height: 60px;
          margin: 0 auto;
          padding: 6px 28px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-logo {
          display: inline-flex;
          align-items: center;
          flex: 0 0 auto;
          white-space: nowrap;
          font-size: 23px;
          line-height: 1;
          font-weight: 850;
          color: #111827;
          text-decoration: none;
          letter-spacing: -0.8px;
        }
        .logo-highlight { color: #db2777; }
        .nav-links {
          display: flex;
          flex: 1 1 auto;
          min-width: 0;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 1.45vw, 23px);
          white-space: nowrap;
        }
        .nav-item-dropdown {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }
        .nav-item-dropdown::after {
          content: "";
          position: absolute;
          top: 100%;
          left: -6px;
          right: -6px;
          height: 14px;
        }
        .nav-link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 38px;
          margin: 0;
          padding: 0 2px;
          border: 0;
          background: transparent;
          color: #334155;
          font-family: inherit;
          font-size: 13px;
          line-height: 1;
          font-weight: 650;
          text-align: center;
          white-space: nowrap;
          cursor: pointer;
          transition: color 160ms ease;
        }
        .nav-link-btn:hover, .nav-link-btn.active { color: #db2777; }
        .arrow-icon { flex: 0 0 auto; transition: transform 180ms ease; }
        .arrow-icon.rotate { transform: rotate(180deg); }

        .mega-dropdown-box {
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: min(92vw, 1360px);
          max-height: calc(100vh - 90px);
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 22px 55px rgba(15, 23, 42, 0.16);
          overflow: hidden;
          z-index: 1001;
          animation: megaFadeIn 160ms ease-out;
        }
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translate(-50%, 6px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .mega-menu-tabs {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding: 14px 22px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .tab-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 8px 15px;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #fff;
          color: #475569;
          font-family: inherit;
          font-size: 12px;
          line-height: 1.25;
          font-weight: 650;
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
        }
        .tab-btn.active, .tab-btn:hover {
          color: #fff;
          background: #db2777;
          border-color: #db2777;
          box-shadow: 0 3px 8px rgba(219, 39, 119, 0.18);
        }
        .mega-menu-content { padding: 22px; overflow-y: auto; }
        .mega-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
          align-items: start;
          gap: 24px;
        }
        .mega-column { display: flex; min-width: 0; flex-direction: column; }
        .mega-group-title {
          margin: 0 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #fbcfe8;
          color: #be185d;
          font-size: 12px;
          line-height: 1.4;
          font-weight: 750;
          letter-spacing: 0.45px;
          text-transform: uppercase;
        }
        .mega-group-title.brand-title { color: #0369a1; border-bottom-color: #bae6fd; }
        .mega-item-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .mega-item-link {
          display: inline-block;
          color: #475569;
          font-size: 12.5px;
          line-height: 1.45;
          font-weight: 450;
          text-decoration: none;
          transition: color 150ms ease, transform 150ms ease;
        }
        .mega-item-link:hover { color: #db2777; transform: translateX(2px); }
        .mega-item-link.brand-link:hover { color: #0284c7; }
        .mega-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 22px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }
        .view-all-link { flex: 0 0 auto; color: #be185d; font-weight: 750; text-decoration: none; }
        .view-all-link:hover { text-decoration: underline; }

        .nav-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: flex-end;
          gap: 13px;
          white-space: nowrap;
        }
        .search-group {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 250px;
          min-width: 500px;
          min-height: 38px;
          padding: 4px 5px 4px 14px;
          border: 1.2px solid #5cc0da;
          border-radius: 999px;
          background: #f8fafc;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }
        .search-group:focus-within {
          border-color: #db2777;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(219, 39, 119, 0.10);
        }
        .desktop-search { flex: 0 1 250px; }
        .search-input-field {
          width: 100%;
          min-width: 0;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #0f172a;
          font-family: inherit;
          font-size: 12px;
          line-height: 1.4;
        }
        .search-input-field::placeholder { color: #94a3b8; }
        
        /* --- VOICE SEARCH STYLING --- */
        .voice-search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          padding: 0;
          border: none;
          background: transparent;
          color: #64748b;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
          flex: 0 0 auto;
        }
        .voice-search-btn:hover {
          color: #db2777;
          transform: scale(1.1);
        }
        .voice-search-btn.listening {
          color: #fff;
          background-color: #dc2626;
          border-radius: 50%;
          animation: pulse-ring 1.5s infinite;
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }

        .search-submit-btn {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 30px;
          padding: 6px 10px;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #db2777, #be185d);
          color: #fff;
          font-family: inherit;
          font-size: 11px;
          line-height: 1;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(219, 39, 119, 0.18);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .search-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 9px rgba(219, 39, 119, 0.22); }
        .theme-icon-btn {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          padding: 0;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          background: #f8fafc;
          color: #334155;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }
        .theme-icon-btn:hover { transform: translateY(-1px); background: #f1f5f9; border-color: #cbd5e1; }
        .mobile-extra-controls, .mobile-search-always-bar { display: none; }
        .action-item {
          position: relative;
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 38px;
          color: #334155;
          font-size: 12px;
          line-height: 1;
          font-weight: 650;
          text-decoration: none;
          transition: color 160ms ease;
        }
        .action-item:hover { color: #db2777; }
        .cart-wrapper { padding: 0 3px; }
        .cart-badge {
          position: absolute;
          top: 1px;
          right: -7px;
          min-width: 15px;
          padding: 2px 3px;
          border-radius: 999px;
          background: #db2777;
          color: #fff;
          font-size: 9px;
          line-height: 1.2;
          font-weight: 750;
          text-align: center;
        }
        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #fff;
          color: #0f172a;
          cursor: pointer;
        }
        .mobile-menu { display: none; }

        /* --- SMART SUB-CATEGORIES BAR (COLLAPSES ON SCROLL) --- */
        .sub-categories-bar {
          width: 100%;
          background: rgba(229, 235, 241, 0.85);
          backdrop-filter: blur(8px);
          padding: 15px 16px;
          border-top: 1px solid rgba(226, 232, 240, 0.5);
          border-bottom: 1px solid rgba(226, 232, 240, 0.7);
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sub-categories-bar::-webkit-scrollbar {
          display: none;
        }
        .sub-categories-track {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          gap: 10px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sub-cat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 60px;
        }
        .sub-cat-item:hover {
          transform: translateY(-2px);
        }
        .sub-cat-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          opacity: 1;
          transform: scale(1);
          max-height: 40px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sub-cat-emoji {
          font-size: 14px;
          transition: opacity 0.2s ease;
        }
        .sub-cat-name {
          color: #334155;
          font-size: 10.5px;
          font-weight: 600;
          font-family: inherit;
          text-align: center;
          transition: color 0.3s ease;
        }

        /* --- WHEN SCROLLED: SMOOTH ANIMATION HIDE ICONS --- */
        .sub-categories-bar.scrolled-sub-bar {
          padding: 3px 16px;
          background: rgba(241, 245, 249, 0.6);
        }
        .sub-categories-bar.scrolled-sub-bar .sub-cat-icon-box {
          opacity: 0;
          transform: scale(0);
          max-height: 0;
          margin-bottom: 0;
          border-width: 0;
        }
        .sub-categories-bar.scrolled-sub-bar .sub-cat-emoji {
          opacity: 0;
        }
        .sub-categories-bar.scrolled-sub-bar .sub-cat-name {
          font-size: 11px;
          font-weight: 700;
          color: #db2777;
        }

        /* Dark Mode Styles for Sub-Bar */
        .sub-categories-bar.dark-sub-bar {
          background: rgba(15, 23, 42, 0.85);
          border-top: 1px solid rgba(51, 65, 85, 0.5);
          border-bottom: 1px solid rgba(51, 65, 85, 0.6);
        }
        .sub-categories-bar.dark-sub-bar.scrolled-sub-bar {
          background: rgba(15, 23, 42, 0.4);
        }
        .dark-icon-box {
          background: rgba(30, 41, 59, 0.9) !important;
          border-color: rgba(51, 65, 85, 0.9) !important;
        }
        .dark-text {
          color: #ffffff !important;
        }
        .sub-categories-bar.dark-sub-bar.scrolled-sub-bar .sub-cat-name {
          color: #f472b6 !important;
        }

        @media (max-width: 1320px) and (min-width: 981px) {
          .nav-container { gap: 18px; padding-right: 20px; padding-left: 20px; }
          .nav-links { gap: clamp(10px, 1.15vw, 16px); }
          .nav-link-btn { font-size: 12.5px; }
          .search-group { width: 210px; }
          .desktop-search { flex-basis: 210px; }
          .nav-actions { gap: 10px; }
          .signin-desktop span { display: none; }
        }
        @media (max-width: 1080px) and (min-width: 981px) {
          .nav-container { gap: 14px; padding-right: 16px; padding-left: 16px; }
          .nav-logo { font-size: 21px; }
          .nav-links { gap: 10px; }
          .search-group { width: 175px; }
          .desktop-search { flex-basis: 175px; }
          .search-submit-btn span { display: none; }
        }

        @media (max-width: 980px) {
          .nav-container { min-height: 55px; padding: 8px 16px; gap: 10px; }
          .nav-logo { font-size: 21px; }
          .nav-links, .desktop-search, .signin-desktop { display: none; }
          .nav-actions { margin-left: auto; gap: 8px; }
          .theme-icon-btn { width: 34px; height: 34px; }
          .mobile-toggle { display: inline-flex; }
          .mobile-search-always-bar {
            display: block;
            padding: 0 14px 8px;
            border-bottom: 1px solid #f1f5f9;
          }
          .mobile-always-search { width: 100%; min-height: 38px; min-width: 300px !important;}
          .mobile-always-search .search-submit-btn { min-width: 32px; min-height: 30px; padding: 6px 8px; }
          .mobile-menu.open {
            display: block;
            position: fixed;
            top: 105px;
            left: 0;
            width: 100%;
            height: calc(100dvh - 105px);
            padding: 16px;
            overflow-y: auto;
            background: #fff;
            box-sizing: border-box;
            z-index: 999;
            border-top: 1px solid #e2e8f0;
          }
          .mobile-extra-controls {
            display: block;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e8f0;
          }
          .mobile-theme-btn {
            width: 100%;
            height: 42px;
            padding: 0 14px;
            border-radius: 10px;
            font-family: inherit;
            font-size: 13px;
            font-weight: 650;
            gap: 8px;
          }
          .mobile-category-block { padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
          .mobile-cat-title {
            color: #0f172a;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 750;
            cursor: pointer;
          }
          .mobile-accordion-body { padding: 8px 0 4px; }
          .mobile-sub-heading {
            margin: 8px 0 6px;
            color: #be185d;
            font-size: 11px;
            line-height: 1.4;
            font-weight: 800;
            letter-spacing: .5px;
            text-transform: uppercase;
          }
          .mobile-sub-heading.brand-heading { color: #0369a1; }
          .mobile-group-box { margin-bottom: 10px; color: #334155; font-size: 12px; line-height: 1.4; }
          .mobile-group-box strong { display: block; margin-bottom: 4px; font-size: 12px; font-weight: 700; }
          .mobile-items-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
          .mobile-sub-link {
            display: inline-flex;
            align-items: center;
            min-height: 27px;
            padding: 4px 8px;
            border-radius: 999px;
            background: #f1f5f9;
            color: #475569;
            font-size: 11px;
            line-height: 1.25;
            text-decoration: none;
          }
          .mobile-sub-link.brand-sub-link { background: #e0f2fe; color: #0369a1; }
          .mobile-signin-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            min-height: 44px;
            margin-top: 18px;
            padding: 10px 16px;
            box-sizing: border-box;
            border-radius: 10px;
            background: linear-gradient(135deg, #db2777, #be185d);
            color: #fff !important;
            font-size: 13.5px;
            line-height: 1.2;
            font-weight: 750;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(219, 39, 119, 0.2);
          }
          .mega-dropdown-box { display: none; }
          
          .sub-categories-track {
            justify-content: flex-start;
            gap: 14px;
          }
        }
        @media (max-width: 420px) {
          .nav-container { padding-right: 12px; padding-left: 12px; }
          .nav-logo { font-size: 19px; }
          .nav-actions { gap: 6px; }
          .theme-icon-btn { width: 32px; height: 32px; }
          .mobile-toggle { width: 35px; height: 35px; }
          .mobile-menu.open { padding: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .navbar *, .navbar *::before, .navbar *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;