import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // Currency conversion rate (1 USD to LKR)
  const USD_TO_LKR_RATE = 320;

  const convertToLKR = (usdPrice) => {
    return Math.round(usdPrice * USD_TO_LKR_RATE).toLocaleString('en-LK');
  };

  // Sample smartphone products
  const sampleSmartphones = [
    {
      id: 'phone1',
      title: "iPhone 14 Pro Max",
      price: 1099.99,
      description: "A16 Bionic chip, 48MP camera, Dynamic Island, 6.7-inch Super Retina XDR display",
      category: "electronics",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.8, count: 150 }
    },
    {
      id: 'phone2',
      title: "Samsung Galaxy S23",
      price: 999.99,
      description: "Snapdragon 8 Gen 2, 50MP camera, 6.6-inch Dynamic AMOLED 2X display",
      category: "electronics",
      image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-5g-1.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 130 }
    },
    {
      id: 'phone3',
      title: "Google Pixel 7 Pro",
      price: 899.99,
      description: "Google Tensor G2, 50MP camera, 6.7-inch LTPO OLED display",
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/712JkPUUlRL.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.6, count: 120 }
    },
    {
      id: 'phone4',
      title: "OnePlus 11",
      price: 699.99,
      description: "Snapdragon 8 Gen 2, Hasselblad camera, 6.7-inch AMOLED display",
      category: "electronics",
      image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.5, count: 100 }
    },
    {
      id: 'phone5',
      title: "Xiaomi 13 Pro",
      price: 899.99,
      description: "Snapdragon 8 Gen 2, Leica optics, 6.73-inch AMOLED display, 50MP triple camera",
      category: "electronics",
      image: "https://th.bing.com/th/id/R.e1faa3ccf5f6733d0799eb2f2523c6fe?rik=BDBOjTrZBu%2fC4Q&pid=ImgRaw&r=0",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.6, count: 95 }
    },
    {
      id: 'phone6',
      title: "Nothing Phone 2",
      price: 699.99,
      description: "Snapdragon 8+ Gen 1, Glyph interface, 6.7-inch OLED display, 50MP dual camera",
      category: "electronics",
      image: "https://media.ldlc.com/r1600/ld/products/00/06/05/10/LD0006051048_0006051058.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.4, count: 85 }
    },
    {
      id: 'phone7',
      title: "Sony Xperia 1 V",
      price: 1299.99,
      description: "Snapdragon 8 Gen 2, 4K OLED display, Pro camera features, 5000mAh battery",
      category: "electronics",
      image: "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-v-1.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 75 }
    },
    {
      id: 'phone8',
      title: "ASUS ROG Phone 7",
      price: 999.99,
      description: "Gaming phone, Snapdragon 8 Gen 2, 165Hz AMOLED, 6000mAh battery",
      category: "electronics",
      image: "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-7-1.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.8, count: 90 }
    },
    {
      id: 'phone9',
      title: "Motorola Edge 40",
      price: 599.99,
      description: "Dimensity 8020, 6.55-inch OLED, 50MP camera, IP68 water resistant",
      category: "electronics",
      image: "https://specs.yugatech.com/wp-content/uploads/2023/03/Moto-X40-600x600.jpeg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.3, count: 70 }
    },
    {
      id: 'phone10',
      title: "Vivo X90 Pro",
      price: 899.99,
      description: "Dimensity 9200, Zeiss optics, 6.78-inch AMOLED, 120W charging",
      category: "electronics",
      image: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-pro-1.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.5, count: 80 }
    }
  ];

  // Sample accessories products
  const sampleAccessories = [
    {
      id: 'acc1',
      title: "Anker 65W GaN Charger",
      price: 49.99,
      description: "3-Port Fast Charging, GaN Technology, Compact Design, Compatible with laptops and phones",
      category: "accessories",
      image: "https://th.bing.com/th/id/OIP.jYPjz2RHLmW9kCh56qXvGgHaHa?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.8, count: 220 }
    },
    {
      id: 'acc2',
      title: "Samsung T7 SSD 1TB",
      price: 119.99,
      description: "Portable SSD, Up to 1,050MB/s, USB 3.2, Shock Resistant, Compact Design",
      category: "accessories",
      image: "https://c1.neweggimages.com/ProductImageCompressAll1280/20-147-764-V02.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 180 }
    },
    {
      id: 'acc3',
      title: "Logitech MX Master 3S",
      price: 99.99,
      description: "Wireless Mouse, 8K DPI, Silent Clicks, USB-C, Multi-Device, Flow Cross-Computer",
      category: "accessories",
      image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SX679_.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.9, count: 150 }
    },
    {
      id: 'acc4',
      title: "Sony WH-1000XM5",
      price: 399.99,
      description: "Wireless Noise Cancelling Headphones, 30-hour Battery, Multi-point Connection",
      category: "accessories",
      image: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SX679_.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.8, count: 290 }
    },
    {
      id: 'acc5',
      title: "Razer Laptop Stand",
      price: 79.99,
      description: "Chroma RGB, USB-C Hub, Adjustable Height, Aluminum Design",
      category: "accessories",
      image: "https://gzhls.at/i/39/78/2783978-n0.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.6, count: 120 }
    },
    {
      id: 'acc6',
      title: "Keychron K3 Pro",
      price: 84.99,
      description: "Ultra-slim Mechanical Keyboard, Hot-swappable, RGB Backlight, Wireless/Wired",
      category: "accessories",
      image: "https://www.pcworld.com/wp-content/uploads/2023/01/keychron-k3-pro-header.jpg?quality=50&strip=all",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 180 }
    },
    {
      id: 'acc7',
      title: "UGREEN Nexode 300W",
      price: 269.99,
      description: "GaN Charging Station, 5 USB-C Ports, Desktop Charger for Multiple Devices",
      category: "accessories",
      image: "https://static.bhphoto.com/images/fb/1804190.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.8, count: 90 }
    },
    {
      id: 'acc8',
      title: "CalDigit TS4 Dock",
      price: 399.99,
      description: "Thunderbolt 4 Dock, 18 Ports, 98W Charging, 8K Display Support",
      category: "accessories",
      image: "https://www.pcworld.com/wp-content/uploads/2023/04/TS4_Vertical-Right-Front-View_White-BG_Version-05.jpg?quality=50&strip=all&w=1024",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.9, count: 150 }
    },
    {
      id: 'acc9',
      title: "Peak Design Tech Pouch",
      price: 59.99,
      description: "Premium Organization for Tech Accessories, Weatherproof, Expandable Design",
      category: "accessories",
      image: "https://cdn.packhacker.com/2018/12/peak-design-tech-pouch-kindle.jpg?auto=compress&auto=format",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 200 }
    },
    {
      id: 'acc10',
      title: "Twelve South HiRise",
      price: 79.99,
      description: "Adjustable Laptop Stand, Ergonomic Design, Compatible with all laptops",
      category: "accessories",
      image: "https://th.bing.com/th/id/R.aa24c7edc3f856f8c07d3d151dc2fde4?rik=qTogFu82xKwN5Q&riu=http%3a%2f%2fwww.bhphotovideo.com%2fimages%2fimages2500x2500%2ftwelve_south_12_1222_b_hirise_adjustable_stand_for_1191390.jpg&ehk=%2fAWKmkZp8DCOsCVrKxbxf3XieOEDXLZffU5zn7Gywj4%3d&risl=&pid=ImgRaw&r=0",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.6, count: 170 }
    }
  ];

  // Sample wearable tech products
  const sampleWearables = [
    {
      id: 'wear1',
      title: "Apple Watch Series 8",
      price: 399.99,
      description: "Temperature sensing, Advanced cycle tracking, Crash detection, Always-On Retina display",
      category: "electronics",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=600&hei=600",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.9, count: 250 }
    },
    {
      id: 'wear2',
      title: "Samsung Galaxy Watch 6",
      price: 329.99,
      description: "Advanced Sleep Coaching, Body Composition Analysis, Durable Design, 40mm",
      category: "electronics",
      image: "https://th.bing.com/th/id/OIP.u0fXqLQJsAaRhiG8wmunPgHaHa?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 180 }
    },
    {
      id: 'wear3',
      title: "Fitbit Sense 2",
      price: 299.99,
      description: "Advanced heart health monitoring, Stress management, GPS, 6+ day battery",
      category: "electronics",
      image: "https://th.bing.com/th/id/OIP.q0crZK7VVDBWzKVr7QHddQAAAA?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.5, count: 150 }
    },
    {
      id: 'wear4',
      title: "Garmin Venu 2",
      price: 349.99,
      description: "Advanced fitness tracking, 10-day battery life, Built-in GPS, Health snapshot",
      category: "electronics",
      image: "https://smartwatchchart.com/wp-content/uploads/2022/01/Garmin-Venu-2-Plus-light-gold-with-ivory-band.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.6, count: 160 }
    },
    {
      id: 'wear5',
      title: "Oura Ring Gen 3",
      price: 299.99,
      description: "Sleep tracking, Activity monitoring, Temperature sensing, Lightweight design",
      category: "electronics",
      image: "https://th.bing.com/th/id/OIP.cLJVvueoa547x4trczO31AHaHa?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.4, count: 120 }
    },
    {
      id: 'wear6',
      title: "Whoop 4.0",
      price: 239.99,
      description: "24/7 health monitoring, Recovery tracking, Strain coach, Battery life 5 days",
      category: "electronics",
      image: "https://th.bing.com/th/id/OIP.LgA1kat1RqpSQbOk2tt3rwHaHa?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.3, count: 110 }
    },
    {
      id: 'wear7',
      title: "Google Pixel Watch",
      price: 349.99,
      description: "Wear OS, Fitbit integration, Heart rate monitoring, Sleep tracking",
      category: "electronics",
      image: "https://cdn1.smartprix.com/rx-iJoj0nGBG-w1200-h1200/Joj0nGBG.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.5, count: 140 }
    },
    {
      id: 'wear8',
      title: "Amazfit GTR 4",
      price: 199.99,
      description: "150+ sports modes, 14-day battery life, Alexa built-in, GPS",
      category: "electronics",
      image: "https://uk.amazfit.com/cdn/shop/products/1_a2dbab0d-4a7e-4088-a2fe-bce937688aeb_480x480.jpg?v=1670225978",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.2, count: 95 }
    },
    {
      id: 'wear9',
      title: "Withings ScanWatch",
      price: 279.99,
      description: "ECG monitoring, SpO2 sensor, 30-day battery life, Classic design",
      category: "electronics",
      image: "https://media.ldlc.com/r1600/ld/products/00/06/10/81/LD0006108177.jpg",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.6, count: 130 }
    },
    {
      id: 'wear10',
      title: "Huawei Watch GT 3",
      price: 249.99,
      description: "14-day battery life, 100+ workout modes, SpO2 monitoring, Sleep tracking",
      category: "electronics",
      image: "https://th.bing.com/th/id/R.e898cfb622bb687777c1120ac860a9fa?rik=m6pFKv6SvLUtIg&pid=ImgRaw&r=0",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.4, count: 115 }
    },
    {
      id: 'wear11',
      title: "TicWatch Pro 5",
      price: 349.99,
      description: "Wear OS 3, Dual-layer display, 80-hour battery life, Military-grade durability",
      category: "electronics",
      image: "https://th.bing.com/th/id/OIP.KX9-nE5d2cH_JtudB8MmWQAAAA?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.3, count: 85 }
    },
    {
      id: 'wear12',
      title: "Polar Vantage V3",
      price: 599.99,
      description: "Advanced training features, ECG sensor, Dual-frequency GPS, Recovery Pro",
      category: "electronics",
      image: "https://th.bing.com/th/id/OIP.xrf_Yuks_sn6SHrZG8B3RwHaH2?rs=1&pid=ImgDetMain",
      dimensions: { width: 600, height: 600 },
      rating: { rate: 4.7, count: 70 }
    }
  ];

  // Custom category mapping
  const categoryMap = {
    "Smartphones": "electronics",
    "Accessories": "accessories",
    "Wearable Tech": "electronics",
    "Gadgets & Electronics": "electronics"
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted.current) {
        const apiProducts = await response.json();
        // Filter out unwanted products and keep only electronics
        const filteredApiProducts = apiProducts.filter(product => 
          product.category === "electronics" && 
          !product.title.includes("Fjallraven") &&
          !product.title.includes("Mens Casual") &&
          !product.title.includes("Mens Cotton")
        );
        // Combine filtered API products with our sample products
        const allProducts = [...filteredApiProducts, ...sampleSmartphones, ...sampleWearables, ...sampleAccessories];
        setData(allProducts);
        setFilter(allProducts);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const filterProduct = (cat) => {
    const apiCategory = categoryMap[cat] || cat.toLowerCase();
    if (cat === "All") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => {
        if (apiCategory === "electronics") {
          if (cat === "Smartphones") {
            return (typeof item.id === 'string' && item.id.startsWith('phone')) || 
                   (item.category === "electronics" && 
                    item.title.toLowerCase().includes("phone"));
          } else if (cat === "Wearable Tech") {
            return (typeof item.id === 'string' && item.id.startsWith('wear')) || 
                   (item.category === "electronics" && (
                     item.title.toLowerCase().includes("watch") || 
                     item.title.toLowerCase().includes("wearable") ||
                     item.title.toLowerCase().includes("ring") ||
                     item.title.toLowerCase().includes("band")
                   ));
          } else if (cat === "Gadgets & Electronics") {
            // Only show electronics products that are not smartphones or wearables
            return item.category === "electronics" && 
                   !item.id.toString().startsWith('phone') && // Exclude smartphones
                   !item.id.toString().startsWith('wear');    // Exclude wearables
          } else {
            return item.category === "electronics";
          }
        } else if (cat === "Accessories") {
          return (typeof item.id === 'string' && item.id.startsWith('acc')) || 
                 item.category === "accessories";
        }
        return item.category === apiCategory;
      });
      setFilter(updatedList);
    }
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("All")}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Gadgets & Electronics")}>Gadgets & Electronics</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Smartphones")}>Smartphones</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Wearable Tech")}>Wearable Tech</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Accessories")}>Accessories</button>
        </div>

        <div className="row">
          {filter.length === 0 ? (
            <div className="col-12 text-center">
              <h3>No products found in this category</h3>
            </div>
          ) : (
            filter.map((product) => (
              <div
                id={product.id}
                key={product.id}
                className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              >
                <div className="card text-center h-100">
                  <img
                    className="card-img-top p-3"
                    src={product.image}
                    alt="Card"
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">LKR {convertToLKR(product.price)}</li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + product.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => {
                        toast.success("Added to cart");
                        addProduct(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
