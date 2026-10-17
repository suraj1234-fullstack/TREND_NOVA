import React, { useState, useEffect } from 'react';

const Footersection = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Show Scroll-to-Top Button ONLY when user reaches the Footer section
  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.getElementById('main-footer');
      if (footerElement) {
        const footerTop = footerElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (footerTop <= windowHeight) {
          setShowScrollBtn(true);
        } else {
          setShowScrollBtn(false);
        }
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

  // 1. Popular Brands (50+ Brands)
  const popularBrands = [
    "Puma", "Nike", "Adidas", "Levi's", "Zara", "H&M", "Jack & Jones",
    "U.S. Polo Assn.", "Tommy Hilfiger", "Calvin Klein", "Woodland", "Bata", "Campus",
    "Crocs", "Red Tape", "Allen Solly", "Peter England", "Van Heusen", "Louis Philippe",
    "Biba", "W for Woman", "Aurelia", "Manyavar", "FabIndia", "Soch", "Janasya",
    "Mohey", "Lakme", "Maybelline", "Nivea", "L'Oreal", "Mamaearth", "Plum",
    "The Derby", "Roadster", "HRX", "DNMX", "Netplay", "Avaasa", "Yousta", "SHEIN",
    "Fastrack", , "Casio", "Wildcraft", "Skybags", "American Tourister", "Bose", "JBL"
  ];

  // 2. Men's Clothing (50+ Items)
  const mensClothing = [
    "Oversized T-Shirts", "Printed Graphic Tees", "Polo T-Shirts", "Casual Denim Shirts",
    "Formal White Shirts", "Linen Shirts", "Slim Fit Jeans", "Baggy Jeans", "Chinos",
    "Cargo Pants", "Formal Trousers", "Track Pants", "Joggers", "Cotton Shorts",
    "Sweatshirts", "Hoodies", "Leather Jackets", "Denim Jackets", "Blazers & Suit Jackets",
    "Kurta Pajama Sets", "Nehru Jackets", "Silk Kurta for Men", "Sherwani", "Dhoti Sets",
    "Vests & Innerwear", "Trunks & Briefs", "Boxers", "Thermal Tops", "Thermal Pants",
    "Nightwear Shorts", "Pajamas", "Sleeveless Gym Tees", "Sports Shorts", "Raincoats",
    "Windcheaters", "Tracksuits", "Ethnic Waistcoats", "Indo-Western Suits", "Tuxedos",
    "Printed Kurtas", "Party Wear Shirts", "Checked Shirts", "Ripped Jeans", "Ankle Length Pants",
    "Activewear Tights", "Compression Tees", " Fleece Hoodies", "Padded Jackets", "Sleeveless Sweaters"
  ];

  // 3. Men's Footwear (30+ Items)
  const mensFootwear = [
    "White Sneakers", "Running Shoes", "Walking Shoes", "Sports Shoes", "Basketball Shoes",
    "Formal Oxford Shoes", "Derby Shoes", "Monk Strap Shoes", "Leather Loafers", "Casual Slip-Ons",
    "Chelsea Boots", "Suede Boots", "High-Top Sneakers", "Flip Flops", "Sliders",
    "Ethnic Mojris", "Juttis", "Floaters", "Sandals", "Clogs", "Trekking Boots",
    "Canvas Shoes", "Gym Shoes", "Waterproof Boots", "House Slippers", "Brogues",
    "Boat Shoes", "Running Sandals", "Outdoor Shoes", "Slip-Resistant Chappals"
  ];

  // 4. Men's Accessories (30+ Items)
  const mensAccessories = [
    "Analog Watches", "Smartwatches", "Chronograph Watches", "Leather Belts", "Reversible Belts",
    "Bifold Leather Wallets", "Card Holders", "Polarized Sunglasses", "Aviator Sunglasses", "Wayfarers",
    "Silk Ties", "Pocket Squares", "Cufflinks", "Baseball Caps", "Beanies",
    "Backpacks", "Laptop Bags", "Duffle Bags", "Gym Bags", "Men's Perfumes & Deos",
    "Beard Trimmers", "Grooming Kits", "Gold Chains", "Bracelets", "Socks",
    "Messenger Bags", "Keychains", "Tie Pins", "Lapel Pins", "Travel Pouches"
  ];

  // 5. Women's Clothing (50+ Items)
  const womensClothing = [
    "Anarkali Suits", "Straight Kurtis", "A-Line Kurtis", "Short Kurtis", "Georgette Sarees",
    "Kanjeevaram Silk Sarees", "Cotton Sarees", "Chiffon Sarees", "Bridal Lehenga Choli", "Party Lehengas",
    "Crop Tops", "Printed T-Shirts", "Formal Blouses", "Bodycon Dresses", "Maxi Dresses",
    "A-Line Dresses", "Co-ord Sets", "Jumpsuits", "Skinny Jeans", "High-Waist Jeans",
    "Palazzo Pants", "Sharara Sets", "Leggings", "Culottes", "Formals Blazers",
    "Cardigans", "Sweaters", "Winter Jackets", "Shrugs", "Nightwear & Nighties",
    "Satin Pajama Sets", "Shapewear", "Bras & Panties", "Sports Bras", "Tracksuits",
    "Dupattas", "Ethnic Skirts", "Kaiftans", "Ethnic Gowns", "Tunics",
    "Pashmina Shawls", "Net Sarees", "Bandhani Sarees", "Peplum Tops", "Off-Shoulder Dresses",
    "Wrap Dresses", "Denim Skirts", "Harem Pants", "Salwar Suits", "Patiala Suits"
  ];

  // 6. Beauty & Personal Care (50+ Items)
  const beautyCare = [
    "Matte Lipsticks", "Liquid Lipsticks", "Lip Gloss", "Foundation", "Concealer",
    "Compact Powder", "Eyeliner", "Kajal", "Mascara", "Eyeshadow Palettes",
    "Blush", "Highlighter", "Face Serums", "Vitamin C Serum", "Moisturizing Creams",
    "Sunscreen SPF 50", "Face Wash", "Face Scrub", "Sheet Masks", "Shampoo",
    "Hair Conditioner", "Hair Serums", "Hair Oils", "Body Lotions", "Body Wash",
    "Perfumes for Women", "Body Mists", "Deodorants", "Makeup Brushes", "Nail Polish",
    "Hair Straighteners", "Hair Dryers", "Skin Toners", "BB & CC Creams", "Makeup Removers",
    "Lip Balms", "Eye Creams", "Anti-Aging Creams", "Acne Gel", "Hair Masks",
    "Dandruff Shampoos", "Hair Color", "Epilators", "Face Pack", "Aloevera Gel",
    "Essential Oils", "Pedicure Kits", "Manicure Kits", "Setting Sprays", "Primer"
  ];

  // 7. Women's Accessories & Footwear (45+ Items)
  const womensAccessoriesFootwear = [
    "Tote Bags", "Handbags", "Sling Bags", "Clutches", "Wallets for Women",
    "Backpacks", "Stilettos", "Block Heels", "Kitten Heels", "Wedges",
    "Ballet Flats", "Casual Sneakers", "Ethnic Juttis", "Kolhapuri Chappals", "Gladiator Sandals",
    "Gold Plated Earrings", "Stud Earrings", "Hoop Earrings", "Choker Necklaces", "Pendant Chains",
    "Bangles & Bracelets", "Anklets (Payal)", "Nose Rings", "Cat-Eye Sunglasses", "Oversized Sunglasses",
    "Smartwatches for Women", "Analogue Leather Watches", "Hair Clips & Bands", "Scarves & Stoles", "Belts",
    "Messenger Bags", "Hobo Bags", "Bucket Bags", "Platform Heels", "Slip-On Shoes",
    "Mules", "Peep Toes", "Jhumkas", "Maang Tikka", "Waist Belts",
    "Travel Organizers", "Makeup Pouches", "Laptop Sleeves", "Key Rings", "Berets"
  ];

  // 8. Kids & Toys (40+ Items)
  const kidsSection = [
    "Baby Rompers", "Onesies", "Boys T-Shirts", "Boys Jeans", "Girls Frocks",
    "Party Dresses for Girls", "Boys Kurta Pajama", "Girls Lehenga Choli", "Kids Shorts", "Tracksuits for Kids",
    "Kids Sneakers", "School Shoes", "Kids Sandals", "Baby Booties", "Kids Nightwear",
    "Winter Jackets for Kids", "Sweatshirts", "Baby Blankets", "Diapers & Wipes", "Baby Care Kits",
    "Educational Toys", "Soft Toys", "School Backpacks", "Water Bottles", "Kids Watches",
    "Hair Accessories for Girls", "Kids Socks", "Baby Towels", "Kids Caps", "Baby Carrier",
    "Remote Control Cars", "Action Figures", "Board Games", "Building Blocks", "Puzzle Games",
    "Dolls & Dollhouses", "Outdoor Play Toys", "Drawing Kits", "Baby Rattles", "Inflatable Pools"
  ];

  // 9. Home & Kitchen (40+ Items)
  const homeKitchenSection = [
    "Bedsheets Set", "Cotton Blankets", "Pillow Covers", "Cushion Covers", "Door Mats",
    "Carpets & Rugs", "Curtains for Living Room", "Bath Towels", "Hand Towels", "Table Runners",
    "Non-Stick Cookware", "Pressure Cookers", "Dinner Sets", "Water Bottles", "Insulated Flasks",
    "Lunch Boxes", "Kitchen Storage Containers", "Spices Jars", "Chopping Boards", "Knife Sets",
    "Mixer Grinders", "Electric Kettles", "Sandwich Makers", "Toasters", "Induction Cooktops",
    "Wall Clocks", "Photo Frames", "Artificial Flowers", "Table Lamps", "Scented Candles",
    "Cleaning Mops", "Laundry Baskets", "Storage Boxes", "Organizers", "Garbage Bags",
    "Bathroom Sets", "Ironing Boards", "Wall Shelves", "Door Mattings", "Floor Cleaners"
  ];

  return (
    <footer id="main-footer" style={styles.footerContainer}>
      {/* SCROLL TO TOP ARROW BUTTON (VISIBILITY ONLY AT FOOTER, WHITE BG WITH BLACK ARROW) */}
      {showScrollBtn && (
        <button 
          onClick={scrollToTop} 
          style={styles.scrollToTopBtn}
          aria-label="Scroll to Top"
          title="Go to Top"
        >
          ↑
        </button>
      )}

      {/* 1. TOP TRUST BADGES STRIP */}
      <div style={styles.trustStrip}>
        <div style={styles.trustItem}>
          <span style={styles.trustIcon}></span>
          <div>
            <h4 style={styles.trustTitle}>FREE SHIPPING</h4>
            <p style={styles.trustDesc}>On all orders above ₹799</p>
          </div>
        </div>
        <div style={styles.trustItem}>
          <span style={styles.trustIcon}></span>
          <div>
            <h4 style={styles.trustTitle}>EASY RETURNS</h4>
            <p style={styles.trustDesc}>15 days hassle-free return</p>
          </div>
        </div>
        <div style={styles.trustItem}>
          <span style={styles.trustIcon}></span>
          <div>
            <h4 style={styles.trustTitle}>100% HANDPICKED</h4>
            <p style={styles.trustDesc}>Assured quality products</p>
          </div>
        </div>
        <div style={styles.trustItem}>
          <span style={styles.trustIcon}></span>
          <div>
            <h4 style={styles.trustTitle}>SECURE PAYMENTS</h4>
            <p style={styles.trustDesc}>UPI, Cards & NetBanking</p>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER LINKS & CONTENT */}
      <div style={styles.mainFooterContent}>
        {/* Column 1: Brand Info */}
        <div style={styles.footerCol}>
          <h2 style={styles.brandLogo}>TREND<span style={styles.logoHighlight}>NOVA</span></h2>
          <p style={styles.brandText}>
            TrendNova is your ultimate fashion destination. Experience high-street trends, 
            ethnic collections, and premium footwear tailored for every style.
          </p>
          <div style={styles.appSection}>
            <h5 style={styles.subHeading}>EXPERIENCE TRENDNOVA APP</h5>
            <div style={styles.appBadges}>
              <button style={styles.appBtn}>Google Play</button>
              <button style={styles.appBtn}>App Store</button>
            </div>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div style={styles.footerCol}>
          <h4 style={styles.colHeading}>SHOP BY CATEGORY</h4>
          <ul style={styles.linkList}>
            <li><a href="#men" style={styles.footerLink}>Men's Fashion</a></li>
            <li><a href="#women" style={styles.footerLink}>Women's Wear</a></li>
            <li><a href="#ethnic" style={styles.footerLink}>Ethnic & Festive</a></li>
            <li><a href="#footwear" style={styles.footerLink}>Footwear & Shoes</a></li>
            <li><a href="#accessories" style={styles.footerLink}>Watches & Accessories</a></li>
            <li><a href="#gadgets" style={styles.footerLink}>Smartphones & Tech</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div style={styles.footerCol}>
          <h4 style={styles.colHeading}>CUSTOMER CARE</h4>
          <ul style={styles.linkList}>
            <li><a href="#help" style={styles.footerLink}>Help Center & FAQ</a></li>
            <li><a href="#orders" style={styles.footerLink}>Track Your Order</a></li>
            <li><a href="#returns" style={styles.footerLink}>Returns & Refunds</a></li>
            <li><a href="#shipping" style={styles.footerLink}>Shipping Policies</a></li>
            <li><a href="#cancellation" style={styles.footerLink}>Cancellation Process</a></li>
            <li><a href="#contact" style={styles.footerLink}>Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div style={styles.footerCol}>
          <h4 style={styles.colHeading}>STAY CONNECTED</h4>
          <p style={styles.newsletterText}>
            Subscribe to get special discount coupons, news, and exclusive offer alerts!
          </p>
          <div style={styles.newsletterBox}>
            <input 
              type="email" 
              placeholder="Enter your email ID" 
              style={styles.newsletterInput} 
            />
            <button style={styles.subscribeBtn}>JOIN</button>
          </div>
          <div style={styles.socialIcons}>
            <span style={styles.socialIcon}>Facebook</span>
            <span style={styles.socialIcon}>Instagram</span>
            <span style={styles.socialIcon}>Twitter</span>
            <span style={styles.socialIcon}>YouTube</span>
          </div>
        </div>
      </div>

      {/* 3. MULTI-SECTION DETAILED DIRECTORY (SEPARATE HEADINGS & 50+ TAGS EACH) */}
      <div style={styles.directorySection}>
        <div style={styles.directoryContainer}>
          
          {/* Section 1: Popular Brands */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>POPULAR BRANDS</h5>
            <div style={styles.tagsCloud}>
              {popularBrands.map((item, idx) => (
                <a key={idx} href={`#brand-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 2: Men's Clothing */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>MEN'S CLOTHING</h5>
            <div style={styles.tagsCloud}>
              {mensClothing.map((item, idx) => (
                <a key={idx} href={`#men-cloth-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 3: Men's Footwear */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>MEN'S FOOTWEAR</h5>
            <div style={styles.tagsCloud}>
              {mensFootwear.map((item, idx) => (
                <a key={idx} href={`#men-shoe-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 4: Men's Accessories */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>MEN'S ACCESSORIES</h5>
            <div style={styles.tagsCloud}>
              {mensAccessories.map((item, idx) => (
                <a key={idx} href={`#men-acc-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 5: Women's Clothing */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>WOMEN'S CLOTHING</h5>
            <div style={styles.tagsCloud}>
              {womensClothing.map((item, idx) => (
                <a key={idx} href={`#women-cloth-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 6: Beauty & Personal Care */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>BEAUTY & PERSONAL CARE</h5>
            <div style={styles.tagsCloud}>
              {beautyCare.map((item, idx) => (
                <a key={idx} href={`#beauty-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 7: Women's Accessories & Footwear */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>WOMEN'S ACCESSORIES & FOOTWEAR</h5>
            <div style={styles.tagsCloud}>
              {womensAccessoriesFootwear.map((item, idx) => (
                <a key={idx} href={`#women-acc-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 8: Kids & Toys */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>KIDS & TOYS</h5>
            <div style={styles.tagsCloud}>
              {kidsSection.map((item, idx) => (
                <a key={idx} href={`#kids-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

          {/* Section 9: Home & Kitchen */}
          <div style={styles.directoryBlock}>
            <h5 style={styles.directoryHeading}>HOME & KITCHEN</h5>
            <div style={styles.tagsCloud}>
              {homeKitchenSection.map((item, idx) => (
                <a key={idx} href={`#home-${idx}`} style={styles.ajioPillTag}>{item}</a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 4. PAYMENT METHODS STRIP */}
      <div style={styles.middleStrip}>
        <div style={styles.paymentSection}>
          <span style={styles.stripLabel}>100% Safe Payments:</span>
          <span style={styles.payBadge}>UPI / Google Pay</span>
          <span style={styles.payBadge}>PhonePe</span>
          <span style={styles.payBadge}>Paytm</span>
          <span style={styles.payBadge}>Visa / Mastercard</span>
          <span style={styles.payBadge}>RuPay</span>
          <span style={styles.payBadge}>Cash on Delivery</span>
        </div>
      </div>

      {/* 5. COPYRIGHT STRIP */}
      <div style={styles.bottomBar}>
        <p style={styles.copyText}>
          © 2026 <strong>TrendNova Retail India Pvt. Ltd.</strong> All Rights Reserved.
        </p>
        <div style={styles.legalLinks}>
          <a href="#privacy" style={styles.legalLink}>Privacy Policy</a>
          <span>|</span>
          <a href="#terms" style={styles.legalLink}>Terms of Service</a>
          <span>|</span>
          <a href="#security" style={styles.legalLink}>Security</a>
        </div>
      </div>
    </footer>
  );
};

// CSS STYLES OBJECT
const styles = {
  footerContainer: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontFamily: "'Poppins', sans-serif",
    marginTop: '40px',
    borderTop: '2px solid #db2777',
    width: '100%',
    position: 'relative',
  },
  scrollToTopBtn: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#ffffff', // Normal white background as requested
    color: '#000000', // Black arrow
    border: '2px solid #cbd5e1',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    fontSize: '22px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  trustStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '15px',
    padding: '25px 5%',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  trustIcon: {
    fontSize: '28px',
  },
  trustTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#f8fafc',
    margin: 0,
    letterSpacing: '0.5px',
  },
  trustDesc: {
    fontSize: '11px',
    color: '#94a3b8',
    margin: '2px 0 0 0',
  },
  mainFooterContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '30px',
    padding: '40px 5%',
    maxWidth: '1380px',
    margin: '0 auto',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandLogo: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: '1px',
    margin: '0 0 12px 0',
  },
  logoHighlight: {
    color: '#db2777',
  },
  brandText: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#ffffff',
    marginBottom: '20px',
  },
  appSection: {
    marginTop: 'auto',
  },
  subHeading: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: '0.5px',
    marginBottom: '10px',
  },
  appBadges: {
    display: 'flex',
    gap: '10px',
  },
  appBtn: {
    backgroundColor: '#334155',
    color: '#ffffff',
    border: '1px solid #475569',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  colHeading: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.8px',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '13px',
  },
  newsletterText: {
    fontSize: '13px',
    lineHeight: '1.5',
    marginBottom: '14px',
  },
  newsletterBox: {
    display: 'flex',
    marginBottom: '20px',
  },
  newsletterInput: {
    padding: '10px 12px',
    fontSize: '13px',
    border: '1px solid #334155',
    borderRadius: '6px 0 0 6px',
    outline: 'none',
    backgroundColor: '#1e293b',
    color: '#fff',
    width: '100%',
  },
  subscribeBtn: {
    backgroundColor: '#db2777',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '0 6px 6px 0',
    fontWeight: '700',
    cursor: 'pointer',
  },
  socialIcons: {
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
  },
  socialIcon: {
    color: '#38bdf8',
    cursor: 'pointer',
    fontWeight: '600',
  },

  /* MULTI-SECTION DIRECTORY STYLES */
  directorySection: {
    backgroundColor: 'rgb(15, 23, 42)', // AJIO Blue Background
    padding: '35px 5%',
    borderTop: '2px solid #2e5973',
  },
  directoryContainer: {
    maxWidth: '1380px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },
  directoryBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  directoryHeading: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '0.8px',
    margin: 0,
    textTransform: 'uppercase',
  },
  tagsCloud: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  ajioPillTag: {
    backgroundColor: 'rgb(36, 47, 73)', // Soft Light Blue Pill Color matching navbar/reference
    color: '#ffffff',
    padding: '6px 14px', // Slightly larger padded box
    borderRadius: '20px',
    fontSize: '12px', // Slightly larger font size
    fontWeight: '500',
    textDecoration: 'none',
    boxShadow: '0 0px 2px rgb(226, 212, 212)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    fontFamily: "'Poppins', sans-serif",
  },

  middleStrip: {
    backgroundColor: '#1e293b',
    padding: '15px 5%',
    borderTop: '1px solid #334155',
    borderBottom: '1px solid #334155',
  },
  paymentSection: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'center',
  },
  stripLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#f8fafc',
    marginRight: '8px',
  },
  payBadge: {
    backgroundColor: '#0f172a',
    color: '#cbd5e1',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    border: '1px solid #334155',
  },
  bottomBar: {
    padding: '20px 5%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '1380px',
    margin: '0 auto',
    fontSize: '12px',
  },
  copyText: {
    margin: 0,
  },
  legalLinks: {
    display: 'flex',
    gap: '10px',
  },
  legalLink: {
    color: '#94a3b8',
    textDecoration: 'none',
  }
};

export default Footersection;