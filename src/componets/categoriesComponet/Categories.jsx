import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CollectionsCategory from "./CollectionsCategory";

// Mapping category names to category IDs
const categoryMapping = {
  "top-sales": 1,
  "long-sleeve": 2,
  "t-shirt": 3,
  "Ftl-hat": 6,
  "black-friday": 8,
};

const Categories = () => {
  const { categoryName } = useParams(); // Get categoryName from URL
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Map categoryName to categoryId
        const categoryId = categoryMapping[categoryName];

        if (!categoryId) {
          console.error("Category not found");
          return;
        }

        const response = await axios.get(
          "https://ftl-server.onrender.com/api/products"
        );
        const filteredProducts = response.data.data.filter(
          (product) => product.categoryId === categoryId // Filter products by categoryId
        );
        setCategoryProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products for category:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div>
      {/* Display category name */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {categoryProducts.slice(0, 6).map((item) => (
          <CollectionsCategory key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
