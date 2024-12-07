import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/ProductSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductPage from "./ProductPage";
import MainBanner from "./ProductLink/MainBanner";
import SmallBanner from "../componets/SmallBanner/SmallBanner";
import Outro from "../componets/Outtro/Outro";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);

  const [activeTab, setActiveTab] = useState("top-sales"); // Default tab
  const [blackFridayProducts, setBlackFridayProducts] = useState([]); // Store filtered Black Friday products
  const [newArrivalProducts, setNewArrivalProducts] = useState([]); // Store filtered New Arrival products
  const [topSales, setTopSales] = useState([]);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://ftl-server.onrender.com/api/products"
        );

        console.log("respiiii", response.data);
        dispatch(setProduct(response.data.data));

        // Filter Top sales products based on categoryId (8 and 9)
        const filterTopSales = response.data.data.filter(
          (product) => product.categoryId === 8
        );
        setTopSales(filterTopSales);

        // Filter Black Friday products based on categoryId (8 and 9)
        const filteredBlackFridayProducts = response.data.data.filter(
          (product) => product.categoryId === 5
        );
        setBlackFridayProducts(filteredBlackFridayProducts);

        // Filter New Arrival products based on categoryId (6)
        const filteredNewArrivalProducts = response.data.data.filter(
          (product) => product.categoryId === 6
        );
        setNewArrivalProducts(filteredNewArrivalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Content for each tab (Placeholder for now)
  const renderTabContent = () => {
    switch (activeTab) {
      case "top-sales":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {topSales.length > 0 ? (
              topSales.map((item) => (
                <ProductPage key={item.id} product={item} images={item.image} />
              ))
            ) : (
              <p>No products available for Black Friday specials.</p>
            )}
          </div>
        );
      case "new-arrivals":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {newArrivalProducts.length > 0 ? (
              newArrivalProducts.map((item) => (
                <ProductPage key={item.id} product={item} images={item.image} />
              ))
            ) : (
              <p>No products available for New Arrivals.</p>
            )}
          </div>
        );
      case "black-friday":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {blackFridayProducts.length > 0 ? (
              blackFridayProducts.map((item) => (
                <ProductPage key={item.id} product={item} images={item.image} />
              ))
            ) : (
              <p>No products available for Black Friday specials.</p>
            )}
          </div>
        );
      default:
        return <p>No products available for this tab.</p>;
    }
  };

  return (
    <div className="overflow-hidden ">
      <div className="flex flex-col">
        <MainBanner />
      </div>

      {/* Tabs Section */}
      <div className="flex items-center justify-between px-2 md:w-[30%] w-[90%] my-8">
        <div>
          <a
            onClick={() => handleTabClick("top-sales")}
            className={`font-light text-[14px] md:text-[16px] text-black cursor-pointer hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black focus:outline-none py-2 ${
              activeTab === "top-sales" ? "border-b-2 border-black" : ""
            }`}
          >
            Top sales
          </a>
        </div>
        <div>
          <a
            onClick={() => handleTabClick("new-arrivals")}
            className={`font-light text-[14px] md:text-[16px] text-black cursor-pointer hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black focus:outline-none py-2 ${
              activeTab === "new-arrivals" ? "border-b-2 border-black" : ""
            }`}
          >
            New Arrivals
          </a>
        </div>
        <div>
          <a
            onClick={() => handleTabClick("black-friday")}
            className={`font-light text-[14px] md:text-[16px] text-black cursor-pointer hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black focus:outline-none p-2 ${
              activeTab === "black-friday" ? "border-b-2 border-black" : ""
            }`}
          >
            Black Friday Specials
          </a>
        </div>
      </div>

      {/* Tab Content Section */}
      <div>{renderTabContent()}</div>

      {/* "View All" Button */}
      <div className="flex items-center mb-6 justify-center">
        <Link
          to={
            activeTab === "top-sales"
              ? "/products"
              : activeTab === "black-friday"
              ? "/collections/black-friday"
              : "/new-arrival"
          }
        >
          <button>View All</button>
        </Link>
      </div>

      {/* Small banner here */}
      <div>
        <SmallBanner />
      </div>

      {/* Slider Outro */}
      <div>
        <Outro />
      </div>
    </div>
  );
};

export default HomePage;
