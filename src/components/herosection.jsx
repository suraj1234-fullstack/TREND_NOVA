import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const images = [
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-S1-P1-AASS-NewUser-Flat30-13102026-1791797220371.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P3-AASS-Jockey-Starting149-17102026-1792144359413.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P5-AASS-Nike-Min50Extra20-17102026-1792144360238.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P6-AASS-ArmaniExchange-Flat40-extra10-17102026-1792144360839.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P6-AASS-Superdry-min50-extra10-17102026-1792144361438.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P8-AASS-Avaasa-Netplay-Under599-17102026-1792144362616.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P11-AASS-Gosriki-AnniDesigner-Min80-17102026-1792144363242.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P13-AASS-Berrylicious-Texstile-Min70-17102026-1792144364448.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P14-AASS-Adidas-Asics-Min45-17102026-1792144365031.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P15-AASS-Svaraa-IndiePicks-Min70-17102026-1792144366317.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P16-AASS-RedTape-Shezone-Under899-17102026-1792144366894.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-UX-S1-P18-AASS-EdaMamma-MiniKlub-Min50-17102026-1792144368065.jpeg"
  ];

  const topTrends = [
    { offer: "MIN. 50% OFF*", brand: "DNMX | PERFORM", bgColor: "#eab308", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80" },
    { offer: "UNDER ₹599*", brand: "DNMX | Fig", bgColor: "#84cc16", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { offer: "UNDER ₹499*", brand: "SHEIN", bgColor: "#facc15", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { offer: "MIN. 30% OFF*", brand: "yousta", bgColor: "#fde047", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" },
    { offer: "FLAT 40% OFF*", brand: "NETPLAY", bgColor: "#fbbf24", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80" },
    { offer: "STARTING ₹399*", brand: "PERFORM", bgColor: "#facc15", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
    { offer: "MIN. 60% OFF*", brand: "AVAASA", bgColor: "#eab308", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80" },
    { offer: "UNDER ₹699*", brand: "RIO", bgColor: "#84cc16", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80" },
    { offer: "FLAT 50% OFF*", brand: "TEAMSPIRIT", bgColor: "#facc15", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { offer: "MIN. 45% OFF*", brand: "AJIO EXCLUSIVE", bgColor: "#fde047", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" }
  ];

  const footwearTrends = [
    { title: "Sports Shoes", brands: "PUMA & more", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { title: "Sneakers", brands: "U.S. POLO | asics", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },
    { title: "Flip Flops", brands: "crocs & more", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" },
    { title: "Casual Shoes", brands: "WOODLAND | CAMPUS", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
    { title: "Sandals", brands: "Lee Cooper | Bata", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?auto=format&fit=crop&w=600&q=80" },
    { title: "Running Shoes", brands: "NIKE | ADIDAS", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80" },
    { title: "Formal Shoes", brands: "HUSH PUPPIES", offer: "FLAT 40% OFF*", image: "https://uomoattire.com/cdn/shop/products/29-formal_shoes_for_men_1000x.jpg?v=1666350181" },
    { title: "Loafers", brands: "RED TAPE", offer: "MIN. 50% OFF*", image: "https://img.magnific.com/premium-photo/loafer-shoes-pair-high-resolutions-image_607646-2414.jpg" },
    { title: "Sliders", brands: "PUMA | NIKE", offer: "UNDER ₹799*", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" },
    { title: "Party Footwear", brands: "MOCHI | METRO", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" }
  ];

  const ethnicWearTrends = [
    { title: "Men's Ethnic", brands: "Jumpers | KISAH", offer: "60 - 80% OFF*", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
    { title: "Kurta Suit Sets", brands: "Janasya | SWADHIN", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Kurta & Kurtis", brands: "Soch | Gulmohar", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80" },
    { title: "Co-ord Sets", brands: "Styleefy | BERRYLICIOUS", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
    { title: "Sarees", brands: "I.N.D.I.E | Sareemall", offer: "MIN. 60% OFF*", image: "https://m.media-amazon.com/images/I/91NDgfXZiML._UL1500_.jpg" },
    { title: "Lehengas", brands: "KALKI | MIRABAI", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Nehru Jackets", brands: "KISAH | Deyann", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
    { title: "Salwar Suits", brands: "BBI | JANASYA", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Ethnic Gowns", brands: "FASHION DREAM", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
    { title: "Dhoti Sets", brands: "SOCH | Libas", offer: "MIN. 45% OFF*", image: "https://i.pinimg.com/originals/7d/f8/cc/7df8cca667f3c16bff08f0440ada4d1a.jpg" }
  ];

  // Authentic Amazon-Style Golden-Orange Festival Deals Banners
  const amazonDeals = [
    {
      title: "Deals on fashion, home & more",
      items: [
        { label: "Under ₹99", subtitle: "Mega savings", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80" },
        { label: "Under ₹199", subtitle: "Up to 60% off", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80" },
        { label: "Under ₹499", subtitle: "Explore more", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80" },
        { label: "Price drop", subtitle: "Lowest prices ever", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      title: "Great deals on laptops & tech",
      items: [
        { label: "Up to 40% off", subtitle: "Thin & light laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
        { label: "Up to 40% off", subtitle: "ASUS & Lenovo", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80" },
        { label: "Up to 40% off", subtitle: "Gaming & Content", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80" },
        { label: "Up to 40% off", subtitle: "Next Gen AI Laptops", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      title: "Festive deals on insurance you'll love",
      items: [
        { label: "Protect your family", subtitle: "Secure future", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" },
        { label: "Save ₹2,500 on premiums", subtitle: "Best offers", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" },
        { label: "Own damage cover", subtitle: "Starting ₹799", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80" },
        { label: "No hidden fees", subtitle: "100% transparent", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const topTrendsRef = useRef(null);
  const footwearRef = useRef(null);
  const ethnicRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const scrollSection = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={styles.mainWrapper}>
      {/* Top Discount Banner */}
      <div style={styles.discountBanner}>
        <span><strong>TrendNova Special Offer:</strong> Use Code <span style={styles.couponCode}>TREND30</span> & Get Flat 30% OFF on All Orders!</span>
      </div>

      {/* Hero Image Slider */}
      <div style={styles.heroContainer}>
        <div 
          style={{
            ...styles.sliderTrack,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((imgUrl, index) => (
            <div key={index} style={styles.slideItem}>
              <img 
                src={imgUrl} 
                alt={`Slide ${index + 1}`} 
                style={styles.slideImage} 
              />
            </div>
          ))}
        </div>

        <button onClick={prevSlide} style={{ ...styles.arrowBtn, left: '10px' }} aria-label="Previous Slide">
          ❮
        </button>

        <button onClick={nextSlide} style={{ ...styles.arrowBtn, right: '10px' }} aria-label="Next Slide">
          ❯
        </button>

        <div style={styles.dotsContainer}>
          {images.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                ...styles.dot,
                backgroundColor: currentIndex === idx ? '#db2777' : 'rgba(255,255,255,0.7)',
                width: currentIndex === idx ? '20px' : '7px'
              }}
            />
          ))}
        </div>
      </div>

      {/* 1. TOP TRENDS SECTION (Original Clean Background) */}
      <div style={styles.topTrendsSection}>
        <div style={styles.headingWrapper}>
          <h2 style={styles.centeredHeading}>
            <span style={styles.sparkle}>✦✨</span> TOP TRENDS <span style={styles.sparkle}>✨✦</span>
          </h2>
          <div style={styles.sectionNavButtons}>
            <button onClick={() => scrollSection(topTrendsRef, 'left')} style={styles.secNavBtn}>❮</button>
            <button onClick={() => scrollSection(topTrendsRef, 'right')} style={styles.secNavBtn}>❯</button>
          </div>
        </div>
        
        <div style={styles.horizontalScrollContainer} ref={topTrendsRef}>
          {topTrends.map((trend, index) => (
            <div key={index} style={styles.ajioCard}>
              <div style={styles.cardImageContainer}>
                <img src={trend.image} alt={trend.brand} style={styles.ajioCardImage} />
                <div style={{ ...styles.overlayBox, backgroundColor: trend.bgColor }}>
                  <div style={styles.overlayOffer}>{trend.offer}</div>
                  <div style={styles.overlayBrand}>{trend.brand}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PINK GRADIENT CONTAINER FOR FOOTWEAR & ETHNICWEAR */}
      <div style={styles.pinkBackgroundContainer}>
        
        {/* 2. FOOTWEAR & ACCESSORIES */}
        <div style={styles.sectionBlock}>
          <div style={styles.headingWrapper}>
            <h2 style={styles.centeredHeading}>
              <span style={styles.sparkle}>✦✨</span> DAINTY FOOTWEAR & ACCESSORIES <span style={styles.sparkle}>✨✦</span>
            </h2>
            <div style={styles.sectionNavButtons}>
              <button onClick={() => scrollSection(footwearRef, 'left')} style={styles.secNavBtn}>❮</button>
              <button onClick={() => scrollSection(footwearRef, 'right')} style={styles.secNavBtn}>❯</button>
            </div>
          </div>
          
          <div style={styles.horizontalScrollContainer} ref={footwearRef}>
            {footwearTrends.map((item, index) => (
              <div key={index} style={styles.footwearCard}>
                <div style={styles.footwearImageWrapper}>
                  <img src={item.image} alt={item.title} style={styles.footwearImage} />
                  <div style={styles.footwearOverlay}>
                    <div style={styles.footwearTitle}>{item.title}</div>
                    <div style={styles.footwearBrands}>{item.brands}</div>
                    <div style={styles.footwearOfferBlue}>{item.offer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ETHNICWEAR SECTION */}
        <div style={styles.sectionBlock}>
          <div style={styles.headingWrapper}>
            <h2 style={styles.centeredHeading}>
              <span style={styles.sparkle}>✦✨</span> ETHNICWEAR <span style={styles.sparkle}>✨✦</span>
            </h2>
            <div style={styles.sectionNavButtons}>
              <button onClick={() => scrollSection(ethnicRef, 'left')} style={styles.secNavBtn}>❮</button>
              <button onClick={() => scrollSection(ethnicRef, 'right')} style={styles.secNavBtn}>❯</button>
            </div>
          </div>
          
          <div style={styles.horizontalScrollContainer} ref={ethnicRef}>
            {ethnicWearTrends.map((item, index) => (
              <div key={index} style={styles.footwearCard}>
                <div style={styles.footwearImageWrapper}>
                  <img src={item.image} alt={item.title} style={styles.footwearImage} />
                  <div style={styles.footwearOverlay}>
                    <div style={styles.footwearTitle}>{item.title}</div>
                    <div style={styles.footwearBrands}>{item.brands}</div>
                    <div style={styles.footwearOfferPink}>{item.offer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. AUTHENTIC AMAZON-STYLE GOLDEN-ORANGE DEALS SECTION PLACED RIGHT BEFORE FOOTER */}
      <div style={styles.amazonDealsWrapper}>
        {amazonDeals.map((dealBlock, idx) => (
          <div key={idx} style={styles.amazonDealCardBlock}>
            <div style={styles.amazonDealHeader}>
              <h3 style={styles.amazonDealTitle}>{dealBlock.title}</h3>
              <span style={styles.seeAllLink}>See all ›</span>
            </div>
            <div style={styles.amazonMiniGrid}>
              {dealBlock.items.map((item, itemIdx) => (
                <div key={itemIdx} style={styles.miniItemBox}>
                  <div style={styles.miniImgWrapper}>
                    <img src={item.image} alt={item.label} style={styles.miniImg} />
                  </div>
                  <div style={styles.miniTextWrapper}>
                    <span style={styles.miniLabel}>{item.label}</span>
                    <span style={styles.miniSubtitle}>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: {
    width: '100%',
    maxWidth: '1380px',
    margin: '4px auto',
    padding: '0 4px',
  },
  discountBanner: {
    margin: '5px',
    backgroundColor: '#db2777',
    color: '#ffffff',
    textAlign: 'center',
    padding: '6px 12px',
    fontSize: '13px',
    fontWeight: '500',
    borderRadius: '6px 6px 0 0',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '0.3px',
    boxShadow: '0 2px 4px rgba(219, 39, 119, 0.15)',
  },
  couponCode: {
    backgroundColor: '#ffffff',
    color: '#db2777',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: 'bold',
    marginLeft: '4px',
    marginRight: '4px',
  },
  heroContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 4.5',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
    backgroundColor: '#000',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
  },
  sliderTrack: {
    display: 'flex',
    width: '100%',
    height: '100%',
    transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
  },
  slideItem: {
    minWidth: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '50%',
    zIndex: 2,
    backdropFilter: 'blur(4px)',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '6px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    zIndex: 2,
  },
  dot: {
    height: '7px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },

  /* AUTHENTIC AMAZON GOLDEN-ORANGE STYLE DEALS SECTION */
  amazonDealsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '20px',
    marginTop: '35px',
    marginBottom: '20px',
    padding: '0 4px',
  },
  amazonDealCardBlock: {
    background: 'linear-gradient(135deg, #fffaf0 0%, #fff3dc 100%)',
    border: '2px solid #fde047',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 6px 16px rgba(217, 119, 6, 0.08)',
  },
  amazonDealHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  amazonDealTitle: {
    fontSize: '19px',
    fontWeight: '900',
    color: '#92400e',
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '0.3px',
  },
  seeAllLink: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0284c7',
    cursor: 'pointer',
  },
  amazonMiniGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '14px',
  },
  miniItemBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    padding: '8px',
    borderRadius: '10px',
    border: '1px solid #fef08a',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
  },
  miniImgWrapper: {
    width: '100%',
    height: '140px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
  },
  miniImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  miniTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2px',
  },
  miniLabel: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#1e293b',
  },
  miniSubtitle: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#64748b',
  },

  topTrendsSection: {
    marginTop: '25px',
    padding: '10px 4px',
  },
  pinkBackgroundContainer: {
    marginTop: '20px',
    padding: '25px 10px',
    borderRadius: '12px',
    background: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 50%, #fdf2f8 100%)',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4) 10px, transparent 10px, transparent 20px)',
    boxShadow: '0 4px 12px rgba(219, 39, 119, 0.06)',
  },
  sectionBlock: {
    marginBottom: '32px',
  },
  headingWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '18px',
    padding: '0 10px',
  },
  centeredHeading: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#b45309',
    margin: 0,
    letterSpacing: '1.5px',
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sparkle: {
    color: '#d97706',
    fontSize: '20px',
    margin: '0 8px',
  },
  sectionNavButtons: {
    position: 'absolute',
    right: '10px',
    display: 'flex',
    gap: '8px',
  },
  secNavBtn: {
    backgroundColor: 'rgba(180, 83, 9, 0.85)',
    color: '#fff',
    border: 'none',
    fontSize: '13px',
    padding: '5px 11px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  horizontalScrollContainer: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: '8px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  ajioCard: {
    minWidth: '240px',
    maxWidth: '240px',
    borderRadius: '16px',
    border: '2px solid #facc15',
    padding: '6px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    flexShrink: 0,
  },
  cardImageContainer: {
    position: 'relative',
    width: '100%',
    height: '340px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  ajioCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlayBox: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '10px 5px',
    textAlign: 'center',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
  },
  overlayOffer: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#111827',
    fontFamily: "'Poppins', sans-serif",
  },
  overlayBrand: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1f2937',
    textTransform: 'uppercase',
    marginTop: '2px',
  },
  footwearCard: {
    minWidth: '210px',
    maxWidth: '210px',
    borderRadius: '14px',
    border: '2px solid #fde047',
    padding: '5px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    flexShrink: 0,
  },
  footwearImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '310px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  footwearImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  footwearOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(3px)',
    padding: '8px 5px',
    textAlign: 'center',
  },
  footwearTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1e293b',
    fontFamily: "'Poppins', sans-serif",
  },
  footwearBrands: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    margin: '2px 0',
  },
  footwearOfferBlue: {
    fontSize: '15px',
    fontWeight: '900',
    color: '#0284c7',
    fontFamily: "'Poppins', sans-serif",
  },
  footwearOfferPink: {
    fontSize: '15px',
    fontWeight: '900',
    color: '#be185d',
    fontFamily: "'Poppins', sans-serif",
  }
};

export default HeroSection;