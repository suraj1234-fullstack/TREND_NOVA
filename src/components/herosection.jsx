import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  // Item Click Navigation Handler
  const handleItemClick = (searchTerm) => {
    if (!searchTerm) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const images = [
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-MB-S1-P1-AASS-NewUser-Flat30-13102026-1791797220371.jpeg",
    "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P7-FS-ONLY-FASHIONNATION-25082026-1787640996171.png",
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

  // New Brand Banner Slider Images
  const brandBannerImages = [
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P2-FS-ASICS-FASHIONNATION-25082026-1787640947262.png", term: "Asics" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P8-FS-RARERABBIT-FASHIONNATION-05082026-1787640962640.png", term: "Rare Rabbit" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P12-FS-USPAWOMEN-FASHIONNATION-25082026-1787640979941.png", term: "US Polo" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P7-FS-ONLY-FASHIONNATION-25082026-1787640996171.png", term: "Only" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P6-FS-MOKOBARA-FASHIONNATION-25082026-1787641008921.png", term: "Mokobara" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P11-FS-UNDERARMOUR-FASHIONNATION-25082026-1787641024027.png", term: "Under Armour" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P3-FS-DAMILANO-FASHIONNATION-25082026-1787641041075.png", term: "Da Milano" },
    { url: "https://assets-jiocdn.ajio.com/v2/dry-wildflower-b77541/ajprod/original/ajio-prod/company/1/applications/6920511ba88a0b4351d486dc/theme/pictures/free/original/D-UHP-ST-TBM-S13-P10-FS-TRAMPOLINE-FASHIONNATION-25082026-1787641055193.png", term: "Trampoline" }
  ];

  const topTrends = [
    { offer: "MIN. 50% OFF*", brand: "DNMX | PERFORM", term: "DNMX", bgColor: "#eab308", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80" },
    { offer: "UNDER ₹599*", brand: "DNMX | Fig", term: "Fig", bgColor: "#84cc16", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { offer: "UNDER ₹499*", brand: "SHEIN", term: "SHEIN", bgColor: "#facc15", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { offer: "MIN. 30% OFF*", brand: "yousta", term: "yousta", bgColor: "#fde047", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" },
    { offer: "FLAT 40% OFF*", brand: "NETPLAY", term: "NETPLAY", bgColor: "#fbbf24", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80" },
    { offer: "STARTING ₹399*", brand: "PERFORM", term: "PERFORM", bgColor: "#facc15", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
    { offer: "MIN. 60% OFF*", brand: "AVAASA", term: "AVAASA", bgColor: "#eab308", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80" },
    { offer: "UNDER ₹699*", brand: "RIO", term: "RIO", bgColor: "#84cc16", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80" },
    { offer: "FLAT 50% OFF*", brand: "TEAMSPIRIT", term: "TEAMSPIRIT", bgColor: "#facc15", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { offer: "MIN. 45% OFF*", brand: "AJIO EXCLUSIVE", term: "AJIO EXCLUSIVE", bgColor: "#fde047", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" }
  ];

  const footwearTrends = [
    { title: " Shoes", brands: "PUMA & more", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { title: "Sneakers", brands: "U.S. POLO | asics", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },
    { title: "Flip Flops", brands: "crocs & more", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" },
    { title: "Casual Shoes", brands: "WOODLAND | CAMPUS", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
    { title: "Sandals", brands: "Lee Cooper | Bata", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?auto=format&fit=crop&w=600&q=80" },
    { title: "Running Shoes", brands: "NIKE | ADIDAS", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80" },
    { title: "Formal Shoes", brands: "HUSH PUPPIES", offer: "FLAT 40% OFF*", image: "https://images.unsplash.com/photo-1533867617858-e7d97e0afd8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Loafers", brands: "RED TAPE", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80" },
    { title: "Sliders", brands: "PUMA | NIKE", offer: "UNDER ₹799*", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" },
    { title: "Party Footwear", brands: "MOCHI | METRO", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" }
  ];

  const ethnicWearTrends = [
    { title: "Men's Ethnic", brands: "Jumpers | KISAH", offer: "60 - 80% OFF*", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
    { title: "Kurta Suit Sets", brands: "Janasya | SWADHIN", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Kurta & Kurtis", brands: "Soch | Gulmohar", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80" },
    { title: "Co-ord Sets", brands: "Styleefy | BERRYLICIOUS", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
    { title: "Sarees", brands: "I.N.D.I.E | Sareemall", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
    { title: "Lehengas", brands: "KALKI | MIRABAI", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Nehru Jackets", brands: "KISAH | Deyann", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
    { title: "Salwar Suits", brands: "BBI | JANASYA", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { title: "Ethnic Gowns", brands: "FASHION DREAM", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
    { title: "Dhoti Sets", brands: "SOCH | Libas", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80" }
  ];

  const kitchenEssentials = [
    { title: "Tissue Paper Roll", brands: "Presto | Origami", offer: "UP TO 40% OFF*", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80" },
    { title: "Cutlery & Spoons", brands: "Pigeon | Milton", offer: "STARTING ₹149*", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80" },
    { title: "Non-Stick Cookware", brands: "Prestige | Hawkins", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" },
    { title: "Glass Dinner Set", brands: "Larah | Borosil", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=600&q=80" },
    { title: "Insulated Flasks", brands: "Milton | Cello", offer: "UNDER ₹499*", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
    { title: "Spice Jars & Racks", brands: "Home Centre", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb26437?auto=format&fit=crop&w=600&q=80" },
    { title: "Chopping Boards", brands: "Nayasa | Oliveware", offer: "STARTING ₹99*", image: "https://images.unsplash.com/photo-1590794009221-3a059535359a?auto=format&fit=crop&w=600&q=80" },
    { title: "Kitchen Storage Boxes", brands: "Signoraware", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" },
    { title: "Water Bottles Set", brands: "Milton | Cello", offer: "UNDER ₹399*", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
    { title: "Silicone Spatulas", brands: "ChefAID", offer: "FLAT 30% OFF*", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80" },
    { title: "Coffee Mugs Set", brands: "Chumbak | Nestasia", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
    { title: "Table Mats & Runners", brands: "D'Decor", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=600&q=80" },
    { title: "Garbage Bags", brands: "Shopylo | Selvel", offer: "STARTING ₹129*", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80" },
    { title: "Dish Drying Rack", brands: "Solimo", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" },
    { title: "Hand Blender", brands: "Bosch | Philips", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1570222094114-d074f3d1e7e5?auto=format&fit=crop&w=600&q=80" },
    { title: "Gas Stove Top", brands: "Butterfly | Prestige", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1556911260-6bd29124422e?auto=format&fit=crop&w=600&q=80" },
    { title: "Kitchen Aprons", brands: "Stitched", offer: "UNDER ₹299*", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80" },
    { title: "Steel Lunch Box", brands: "Pigeon | Borosil", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1589365252845-a764d60c1fb4?auto=format&fit=crop&w=600&q=80" },
    { title: "Casserole Hot Pot", brands: "Milton", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1589365252845-a764d60c1fb4?auto=format&fit=crop&w=600&q=80" },
    { title: "Pressure Cooker", brands: "Hawkins | Prestige", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" },
    { title: "Vegetable Chopper", brands: "Pigeon", offer: "STARTING ₹199*", image: "https://images.unsplash.com/photo-1590794009221-3a059535359a?auto=format&fit=crop&w=600&q=80" },
    { title: "Oil Dispenser Bottle", brands: "Signoraware", offer: "UNDER ₹299*", image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb26437?auto=format&fit=crop&w=600&q=80" },
    { title: "Silicon Baking Tray", brands: "MasterClass", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80" },
    { title: "Wall Shelves", brands: "Wakefit | Amazon", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80" },
    { title: "Bean Bag Cover", brands: "Milliarden", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" },
    { title: "Cushion Covers Set", brands: "Home Sizzler", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80" },
    { title: "Bed Sheets King Size", brands: "Bombay Dyeing", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" },
    { title: "Door Mats Anti-Skid", brands: "Status", offer: "UNDER ₹199*", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80" },
    { title: "Curtains for Living Room", brands: "Spaces", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
    { title: "Laundry Basket", brands: "Cello", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80" },
    { title: "Shoe Rack Organizer", brands: "DeckUp", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80" },
    { title: "Study Table Foldable", brands: "Nilkamal", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80" },
    { title: "LED Desk Lamp", brands: "Wipro | Philips", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
    { title: "Key Holder Wall Mount", brands: "Kraft Icon", offer: "UNDER ₹299*", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80" },
    { title: "Ironing Board", brands: "Bathla", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80" }
  ];

  const electronicGadgets = [
    { title: "Wireless Earbuds", brands: "boAt | OnePlus", offer: "MIN. 60% OFF*", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart Watch Series", brands: "Noise | Fire-Boltt", offer: "STARTING ₹1,299*", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { title: "Bluetooth Speakers", brands: "JBL | Sony", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
    { title: "Gaming Mechanical Keyboard", brands: "Razer | Cosmic Byte", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
    { title: "RGB Gaming Mouse", brands: "Logitech | Zebronics", offer: "UNDER ₹699*", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80" },
    { title: "Fast Power Bank 20000mAh", brands: "Mi | URBN", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1609592424104-97d4c42c75f0?auto=format&fit=crop&w=600&q=80" },
    { title: "Type-C Braided Cable", brands: "Portronics", offer: "STARTING ₹199*", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80" },
    { title: "Ring Light with Stand", brands: "Digitek", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80" },
    { title: "Wireless Charging Pad", brands: "Belkin | Spigen", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1622445275576-7243c7d34d18?auto=format&fit=crop&w=600&q=80" },
    { title: "Laptop Cooling Pad", brands: "Cosmic Byte", offer: "UNDER ₹899*", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80" },
    { title: "Over-Ear Headphones", brands: "Sony | JBL", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart LED Bulb", brands: "Wipro | Syska", offer: "STARTING ₹299*", image: "https://images.unsplash.com/photo-1550985616-11610c814757?auto=format&fit=crop&w=600&q=80" },
    { title: "Mini Projector 1080p", brands: "EGate | Zebronics", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80" },
    { title: "Action Camera 4K", brands: "GoPro | Insta360", offer: "FLAT ₹5,000 OFF*", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80" },
    { title: "Stylus Pen for Tablet", brands: "Apple | Portronics", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1585336261022-6fc0e698889a?auto=format&fit=crop&w=600&q=80" },
    { title: "Phone Gimbal Stabilizer", brands: "DJI | Hohem", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80" },
    { title: "External SSD 1TB", brands: "SanDisk | Samsung", offer: "MIN. 45% OFF*", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80" },
    { title: "USB Hub 4-in-1", brands: "Portronics | TP-Link", offer: "UNDER ₹499*", image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart Plug 10A", brands: "GM | Havells", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1550985616-11610c814757?auto=format&fit=crop&w=600&q=80" },
    { title: "Car Phone Mount", brands: "Spigen", offer: "UNDER ₹399*", image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80" },
    { title: "Trimmer for Men", brands: "Philips | Mi", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80" },
    { title: "Hair Dryer Professional", brands: "Havells | Vega", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart TV Stick", brands: "Amazon Fire TV", offer: "FLAT ₹1,000 OFF*", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80" },
    { title: "Wi-Fi Range Extender", brands: "TP-Link | D-Link", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart Security Camera", brands: "Mi | CP Plus", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=600&q=80" },
    { title: "RGB Light Strip", brands: "Wipro", offer: "STARTING ₹349*", image: "https://images.unsplash.com/photo-1550985616-11610c814757?auto=format&fit=crop&w=600&q=80" },
    { title: "Bluetooth Soundbar", brands: "Boat | Infinity", offer: "MIN. 55% OFF*", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" },
    { title: "Car Bluetooth Adapter", brands: "Portronics", offer: "UNDER ₹299*", image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart Door Lock", brands: "Godrej", offer: "MIN. 25% OFF*", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=600&q=80" },
    { title: "Electric Toothbrush", brands: "Oral-B", offer: "MIN. 30% OFF*", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80" },
    { title: "Neckband Earphones", brands: "OnePlus | Realme", offer: "MIN. 50% OFF*", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80" },
    { title: "Dual Controller Charger", brands: "Sony PlayStation", offer: "MIN. 20% OFF*", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80" },
    { title: "Tablet Stand Aluminum", brands: "Rizzen", offer: "UNDER ₹399*", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80" },
    { title: "Webcam 1080p HD", brands: "Logitech", offer: "MIN. 35% OFF*", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80" },
    { title: "Smart Air Purifier", brands: "Xiaomi | Philips", offer: "MIN. 40% OFF*", image: "https://images.unsplash.com/photo-1585336261022-6fc0e698889a?auto=format&fit=crop&w=600&q=80" }
  ];

  const amazonDeals = [
    {
      title: "Deals on fashion, home & more",
      items: [
        { label: "Under ₹99", subtitle: "Mega savings", term: "Fashion", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80" },
        { label: "Under ₹199", subtitle: "Up to 60% off", term: "Home Essentials", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80" },
        { label: "Under ₹499", subtitle: "Explore more", term: "Topwear", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80" },
        { label: "Price drop", subtitle: "Lowest prices ever", term: "Deals", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      title: "Great deals on laptops & tech",
      items: [
        { label: "Up to 40% off", subtitle: "Thin & light laptops", term: "Laptop", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
        { label: "Up to 40% off", subtitle: "ASUS & Lenovo", term: "Lenovo", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80" },
        { label: "Up to 40% off", subtitle: "Gaming & Content", term: "Gaming Laptop", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80" },
        { label: "Up to 40% off", subtitle: "Next Gen AI Laptops", term: "AI Laptop", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80" }
      ]
    },
    {
      title: "Festive deals on insurance you'll love",
      items: [
        { label: "Protect your family", subtitle: "Secure future", term: "Insurance", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" },
        { label: "Save ₹2,500 on premiums", subtitle: "Best offers", term: "Offers", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" },
        { label: "Own damage cover", subtitle: "Starting ₹799", term: "Cover", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80" },
        { label: "No hidden fees", subtitle: "100% transparent", term: "Transparent Deals", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const timeoutRef = useRef(null);
  const bannerTimeoutRef = useRef(null);

  const topTrendsRef = useRef(null);
  const footwearRef = useRef(null);
  const ethnicRef = useRef(null);
  const kitchenRef = useRef(null);
  const gadgetsRef = useRef(null);

  // Main Hero Auto-slide
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, images.length]);

  // Brand Banners Auto-slide
  useEffect(() => {
    bannerTimeoutRef.current = setTimeout(() => {
      setBannerIndex((prevIndex) => (prevIndex === brandBannerImages.length - 1 ? 0 : prevIndex + 1));
    }, 3500);

    return () => clearTimeout(bannerTimeoutRef.current);
  }, [bannerIndex, brandBannerImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextBanner = () => {
    setBannerIndex((prevIndex) => (prevIndex === brandBannerImages.length - 1 ? 0 : prevIndex + 1));
  };

  const prevBanner = () => {
    setBannerIndex((prevIndex) => (prevIndex === 0 ? brandBannerImages.length - 1 : prevIndex - 1));
  };

  const scrollSection = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 280;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={styles.mainWrapper}>
      {/* Top Discount Banner */}
      <div style={styles.discountBanner} onClick={() => handleItemClick('Fashion Offer')}>
        <span><strong>TrendNova Special Offer:</strong> Use Code <span style={styles.couponCode}>TREND30</span> & Get Flat 30% OFF!</span>
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
            <div key={index} style={styles.slideItem} onClick={() => handleItemClick('Trending Fashion')}>
              <img 
                src={imgUrl} 
                alt={`Slide ${index + 1}`} 
                style={styles.slideImage} 
              />
            </div>
          ))}
        </div>

        <button onClick={prevSlide} style={{ ...styles.arrowBtn, left: '6px' }} aria-label="Previous Slide">
          ❮
        </button>

        <button onClick={nextSlide} style={{ ...styles.arrowBtn, right: '6px' }} aria-label="Next Slide">
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
                width: currentIndex === idx ? '16px' : '6px'
              }}
            />
          ))}
        </div>
      </div>

      {/* 1. TOP TRENDS SECTION */}
      <div style={styles.topTrendsSection}>
        <div style={styles.headingWrapper}>
          <h2 style={styles.centeredHeading}>
            <span style={styles.sparkle}>✦</span> TOP TRENDS <span style={styles.sparkle}>✦</span>
          </h2>
          <div style={styles.sectionNavButtons}>
            <button onClick={() => scrollSection(topTrendsRef, 'left')} style={styles.secNavBtn}>❮</button>
            <button onClick={() => scrollSection(topTrendsRef, 'right')} style={styles.secNavBtn}>❯</button>
          </div>
        </div>
        
        <div style={styles.horizontalScrollContainer} ref={topTrendsRef}>
          {topTrends.map((trend, index) => (
            <div key={index} style={styles.ajioCard} onClick={() => handleItemClick(trend.term || trend.brand)}>
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

      {/* GOLDEN GRADIENT CONTAINER */}
      <div style={styles.goldenBackgroundContainer}>
        
        {/* 2. FOOTWEAR & ACCESSORIES */}
        <div style={styles.sectionBlock}>
          <div style={styles.headingWrapper}>
            <h2 style={styles.goldHeading}>
              <span style={styles.sparkleGold}>✦</span> FOOTWEAR & ACCESSORIES <span style={styles.sparkleGold}>✦</span>
            </h2>
            <div style={styles.sectionNavButtons}>
              <button onClick={() => scrollSection(footwearRef, 'left')} style={styles.secNavBtnGold}>❮</button>
              <button onClick={() => scrollSection(footwearRef, 'right')} style={styles.secNavBtnGold}>❯</button>
            </div>
          </div>
          
          <div style={styles.horizontalScrollContainer} ref={footwearRef}>
            {footwearTrends.map((item, index) => (
              <div key={index} style={styles.footwearCard} onClick={() => handleItemClick(item.title)}>
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
            <h2 style={styles.goldHeading}>
              <span style={styles.sparkleGold}>✦</span> ETHNICWEAR <span style={styles.sparkleGold}>✦</span>
            </h2>
            <div style={styles.sectionNavButtons}>
              <button onClick={() => scrollSection(ethnicRef, 'left')} style={styles.secNavBtnGold}>❮</button>
              <button onClick={() => scrollSection(ethnicRef, 'right')} style={styles.secNavBtnGold}>❯</button>
            </div>
          </div>
          
          <div style={styles.horizontalScrollContainer} ref={ethnicRef}>
            {ethnicWearTrends.map((item, index) => (
              <div key={index} style={styles.footwearCard} onClick={() => handleItemClick(item.title)}>
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

        {/* 4. KITCHEN & HOME ESSENTIALS SECTION */}
        <div style={styles.sectionBlock}>
          <div style={styles.headingWrapper}>
            <h2 style={styles.goldHeadingLarge}>
              <span style={styles.sparkleGold}>✦</span> KITCHEN & HOME ESSENTIALS <span style={styles.sparkleGold}>✦</span>
            </h2>
            <div style={styles.sectionNavButtons}>
              <button onClick={() => scrollSection(kitchenRef, 'left')} style={styles.secNavBtnGold}>❮</button>
              <button onClick={() => scrollSection(kitchenRef, 'right')} style={styles.secNavBtnGold}>❯</button>
            </div>
          </div>
          
          <div style={styles.horizontalScrollContainer} ref={kitchenRef}>
            {kitchenEssentials.map((item, index) => (
              <div key={index} style={styles.largeCard} onClick={() => handleItemClick(item.title)}>
                <div style={styles.largeImageWrapper}>
                  <img src={item.image} alt={item.title} style={styles.largeImage} />
                  <div style={styles.largeOverlay}>
                    <div style={styles.largeTitle}>{item.title}</div>
                    <div style={styles.largeBrands}>{item.brands}</div>
                    <div style={styles.largeOfferPink}>{item.offer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. ELECTRONIC GADGETS SECTION */}
        <div style={styles.sectionBlock}>
          <div style={styles.headingWrapper}>
            <h2 style={styles.goldHeadingLarge}>
              <span style={styles.sparkleGold}>✦</span> ELECTRONIC GADGETS <span style={styles.sparkleGold}>✦</span>
            </h2>
            <div style={styles.sectionNavButtons}>
              <button onClick={() => scrollSection(gadgetsRef, 'left')} style={styles.secNavBtnGold}>❮</button>
              <button onClick={() => scrollSection(gadgetsRef, 'right')} style={styles.secNavBtnGold}>❯</button>
            </div>
          </div>
          
          <div style={styles.horizontalScrollContainer} ref={gadgetsRef}>
            {electronicGadgets.map((item, index) => (
              <div key={index} style={styles.largeCard} onClick={() => handleItemClick(item.title)}>
                <div style={styles.largeImageWrapper}>
                  <img src={item.image} alt={item.title} style={styles.largeImage} />
                  <div style={styles.largeOverlay}>
                    <div style={styles.largeTitle}>{item.title}</div>
                    <div style={styles.largeBrands}>{item.brands}</div>
                    <div style={styles.largeOfferBlue}>{item.offer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. NEW BRAND HIGHLIGHT BANNER SLIDER */}
      <div style={styles.brandBannerSection}>
        <div style={styles.headingWrapper}>
          <h2 style={styles.centeredHeading}>
            <span style={styles.sparkle}>✦</span> FEATURED BRAND SPONSERS <span style={styles.sparkle}>✦</span>
          </h2>
        </div>

        <div style={styles.heroContainer}>
          <div 
            style={{
              ...styles.sliderTrack,
              transform: `translateX(-${bannerIndex * 100}%)`,
            }}
          >
            {brandBannerImages.map((b, index) => (
              <div key={index} style={styles.slideItem} onClick={() => handleItemClick(b.term || b.url)}>
                <img 
                  src={typeof b === 'string' ? b : b.url} 
                  alt={`Brand Banner ${index + 1}`} 
                  style={styles.slideImage} 
                />
              </div>
            ))}
          </div>

          <button onClick={prevBanner} style={{ ...styles.arrowBtn, left: '6px' }} aria-label="Previous Banner">
            ❮
          </button>

          <button onClick={nextBanner} style={{ ...styles.arrowBtn, right: '6px' }} aria-label="Next Banner">
            ❯
          </button>

          <div style={styles.dotsContainer}>
            {brandBannerImages.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setBannerIndex(idx)}
                style={{
                  ...styles.dot,
                  backgroundColor: bannerIndex === idx ? '#db2777' : 'rgba(255,255,255,0.7)',
                  width: bannerIndex === idx ? '16px' : '6px'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 7. AMAZON-STYLE DEALS SECTION */}
      <div style={styles.amazonDealsWrapper}>
        {amazonDeals.map((dealBlock, idx) => (
          <div key={idx} style={styles.amazonDealCardBlock}>
            <div style={styles.amazonDealHeader}>
              <h3 style={styles.amazonDealTitle}>{dealBlock.title}</h3>
              <span style={styles.seeAllLink} onClick={() => handleItemClick(dealBlock.title)}>See all ›</span>
            </div>
            <div style={styles.amazonMiniGrid}>
              {dealBlock.items.map((item, itemIdx) => (
                <div key={itemIdx} style={styles.miniItemBox} onClick={() => handleItemClick(item.term || item.label)}>
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
    margin: '70px auto 10px auto',
    padding: '0 8px',
  },
  discountBanner: {
    margin: '5px 0',
    backgroundColor: '#db2777',
    color: '#ffffff',
    textAlign: 'center',
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '6px',
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
  },
  couponCode: {
    backgroundColor: '#ffffff',
    color: '#db2777',
    padding: '1px 5px',
    borderRadius: '3px',
    fontWeight: 'bold',
  },
  heroContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 5',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#000',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
    marginTop: '6px',
    cursor: 'pointer',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: '#fff',
    border: 'none',
    fontSize: '12px',
    padding: '5px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    zIndex: 2,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '5px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    zIndex: 2,
  },
  dot: {
    height: '6px',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  topTrendsSection: {
    marginTop: '20px',
    padding: '4px 0',
  },
  brandBannerSection: {
    marginTop: '25px',
    padding: '4px 0',
  },
  goldenBackgroundContainer: {
    marginTop: '16px',
    padding: '20px 10px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #fef08a 0%, #fde047 30%, #eab308 70%, #ca8a04 100%)',
    boxShadow: '0 4px 15px rgba(234, 179, 8, 0.25)',
  },
  sectionBlock: {
    marginBottom: '28px',
  },
  headingWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '14px',
    padding: '0 4px',
  },
  centeredHeading: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#b45309',
    margin: 0,
    letterSpacing: '0.8px',
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  goldHeading: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#78350f',
    margin: 0,
    letterSpacing: '0.8px',
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  goldHeadingLarge: {
    fontSize: '18px',
    fontWeight: '900',
    color: '#451a03',
    margin: 0,
    letterSpacing: '1px',
    fontFamily: "'Poppins', sans-serif",
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
  },
  sparkle: {
    color: '#d97706',
    fontSize: '13px',
    margin: '0 4px',
  },
  sparkleGold: {
    color: '#b45309',
    fontSize: '15px',
    margin: '0 4px',
  },
  sectionNavButtons: {
    position: 'absolute',
    right: '4px',
    display: 'flex',
    gap: '4px',
  },
  secNavBtn: {
    backgroundColor: 'rgba(180, 83, 9, 0.9)',
    color: '#fff',
    border: 'none',
    fontSize: '10px',
    padding: '3px 7px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontWeight: 'bold',
  },
  secNavBtnGold: {
    backgroundColor: '#78350f',
    color: '#fff',
    border: 'none',
    fontSize: '11px',
    padding: '4px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
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
    minWidth: '150px',
    maxWidth: '150px',
    borderRadius: '10px',
    border: '1.5px solid #facc15',
    padding: '4px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    flexShrink: 0,
  },
  cardImageContainer: {
    position: 'relative',
    width: '100%',
    height: '210px',
    borderRadius: '8px',
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
    padding: '6px 4px',
    textAlign: 'center',
  },
  overlayOffer: {
    fontSize: '12px',
    fontWeight: '900',
    color: '#111827',
    fontFamily: "'Poppins', sans-serif",
  },
  overlayBrand: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#1f2937',
    textTransform: 'uppercase',
  },
  footwearCard: {
    minWidth: '140px',
    maxWidth: '140px',
    borderRadius: '10px',
    border: '1.5px solid #fde047',
    padding: '4px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    flexShrink: 0,
  },
  footwearImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '190px',
    borderRadius: '8px',
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
    padding: '6px 4px',
    textAlign: 'center',
  },
  footwearTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#1e293b',
    fontFamily: "'Poppins', sans-serif",
  },
  footwearBrands: {
    fontSize: '9px',
    fontWeight: '600',
    color: '#64748b',
    margin: '1px 0',
  },
  footwearOfferBlue: {
    fontSize: '11px',
    fontWeight: '900',
    color: '#0284c7',
  },
  footwearOfferPink: {
    fontSize: '11px',
    fontWeight: '900',
    color: '#be185d',
  },

  largeCard: {
    minWidth: '190px',
    maxWidth: '190px',
    borderRadius: '12px',
    border: '2px solid #ca8a04',
    padding: '5px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'transform 0.2s ease',
  },
  largeImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '250px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  largeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  largeOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '8px 6px',
    textAlign: 'center',
  },
  largeTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: "'Poppins', sans-serif",
  },
  largeBrands: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#475569',
    margin: '2px 0',
  },
  largeOfferPink: {
    fontSize: '12px',
    fontWeight: '900',
    color: '#be185d',
  },
  largeOfferBlue: {
    fontSize: '12px',
    fontWeight: '900',
    color: '#0369a1',
  },

  amazonDealsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '14px',
    marginTop: '25px',
    marginBottom: '16px',
  },
  amazonDealCardBlock: {
    background: 'linear-gradient(135deg, #fffaf0 0%, #fff3dc 100%)',
    border: '1.5px solid #fde047',
    borderRadius: '12px',
    padding: '14px',
  },
  amazonDealHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  amazonDealTitle: {
    fontSize: '15px',
    fontWeight: '900',
    color: '#92400e',
    margin: 0,
  },
  seeAllLink: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#0284c7',
    cursor: 'pointer',
  },
  amazonMiniGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  miniItemBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backgroundColor: '#ffffff',
    padding: '6px',
    borderRadius: '8px',
    border: '1px solid #fef08a',
    cursor: 'pointer',
  },
  miniImgWrapper: {
    width: '100%',
    height: '100px',
    borderRadius: '6px',
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
  },
  miniLabel: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#1e293b',
  },
  miniSubtitle: {
    fontSize: '9px',
    fontWeight: '600',
    color: '#64748b',
  }
};

export default HeroSection;