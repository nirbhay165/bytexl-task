import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard"; // Adjust the import path as needed

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCategory, setSearchCategory] = useState("Computer");
  const [searchCompany, setSearchCompany] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [uniqueCompanies, setUniqueCompanies] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false); // State to track no products found

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          "https://json-server.bytexl.app/products"
        );
        setProducts(result.data); // Set all products from API response
        // Extract unique company names
        const companies = result.data.reduce((acc, product) => {
          if (!acc.includes(product.company)) {
            acc.push(product.company);
          }
          return acc;
        }, []);
        setUniqueCompanies(companies);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    // Filter products based on search criteria
    const filtered = products.filter((product) => {
      return (
        product.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
        (searchCompany ? product.company.toLowerCase().includes(searchCompany.toLowerCase()) : true) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });

    // Update state based on filtered results
    setFilteredProducts(filtered);
    // Set no products found if filtered results are empty
    setNoProductsFound(filtered.length === 0);
  }, [products, searchCategory, searchCompany, minPrice, maxPrice]);

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSearchCompany(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleSearch = () => {
    // Triggered when the search button is clicked
    // Perform filtering based on current state values
    const filtered = products.filter((product) => {
      return (
        product.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
        (searchCompany ? product.company.toLowerCase().includes(searchCompany.toLowerCase()) : true) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });

    // Update state based on filtered results
    setFilteredProducts(filtered);
    // Set no products found if filtered results are empty
    setNoProductsFound(filtered.length === 0);
  };

  return (
    <div className="mt-10 container mx-auto p-4 bg-gray-900 text-white">
      <div className="flex shadow-sm shadow-slate-300 border-slate-600 border-2 p-3 rounded-md justify-center items-center gap-2 flex-wrap mb-6">
        <label htmlFor="minPrice" className="flex items-center">
          Min Price:
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border border-gray-300 rounded px-3 py-2 bg-gray-800 text-white ml-2"
          />
        </label>
        <label htmlFor="maxPrice" className="flex items-center">
          Max Price:
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            min={minPrice}
            className="border border-gray-300 rounded px-3 py-2 bg-gray-800 text-white ml-2"
          />
        </label>
        <label htmlFor="searchCategory" className="flex items-center">
          Search Category:
          <input
            type="text"
            id="searchCategory"
            value={searchCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded px-3 py-2 bg-gray-800 text-white ml-2"
          />
        </label>
        <label htmlFor="searchCompany" className="flex items-center">
          Search Company:
          <select
            id="searchCompany"
            value={searchCompany}
            onChange={handleCompanyChange}
            className="border border-gray-300 rounded px-3 py-2 bg-gray-800 text-white ml-2"
          >
            <option value="">All Companies</option>
            {uniqueCompanies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Search
        </button>
      </div>

      <div className="overflow-y-auto max-h-screen">
        {noProductsFound ? (
          <div className="text-center text-gray-400 mt-8">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
