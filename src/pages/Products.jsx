import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

function Products() {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("relevance");
    const { addToCart } = useCart();


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
        
        const uniqueCategories = [...new Set(json.map(item => item.category))];
        setCategories(uniqueCategories);
        
        const maxPrice = Math.max(...json.map(item => item.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, priceRange, sortOption, data]);

  const applyFilters = () => {
    let results = [...data];

    if (selectedCategory !== "all") {
      results = results.filter(item => item.category === selectedCategory);
    }

    results = results.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    switch(sortOption) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredData(results);
  };

  const handlePriceRangeChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, Math.ceil(Math.max(...data.map(item => item.price)))]);
    setSortOption("relevance");
  };

  // Theme-based styles
  const themeStyles = {
    background: theme === 'dark' ? 'bg-slate-800' : 'bg-white',
    text: theme === 'dark' ? 'text-white' : 'text-gray-800',
    card: theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50',
    filterSection: theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100',
    headerSection: theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300',
    button: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
    resetButton: theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-gray-300 hover:bg-gray-400',
    input: theme === 'dark' ? 'bg-slate-600 text-white border-slate-500' : 'bg-white text-gray-800 border-gray-300'
  };

  return (
    <div className={`${themeStyles.background} ${themeStyles.text} min-h-screen`}>
      {/* Filters section */}
      <div className={`${themeStyles.filterSection} p-4 mb-4 rounded-lg`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category filter */}
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">Category</label>
            <select
              id="category"
              className={`py-2 px-4 border rounded ${themeStyles.input}`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price range filter */}
          <div>
            <label className="block mb-1 font-medium">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className={`py-2 px-3 border rounded w-20 ${themeStyles.input}`}
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                className={`py-2 px-3 border rounded w-20 ${themeStyles.input}`}
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
                min={priceRange[0]}
              />
            </div>
          </div>

          {/* Reset filters */}
          <button
            onClick={resetFilters}
            className={`self-end py-2 px-4 rounded hover:transition-colors ${themeStyles.resetButton}`}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Products header */}
      <div className={`${themeStyles.headerSection} flex items-center justify-between p-3 rounded-lg mb-4`}>
        <h1>{filteredData.length} products</h1>
        <div>
          <select
            className={`py-2 px-4 border rounded ${themeStyles.input}`}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center p-6 shadow-lg rounded-lg w-80 cursor-pointer hover:shadow-xl transition-all duration-300 ${themeStyles.card}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-60 w-52 object-contain"
              />
              <div className="flex flex-col items-center justify-center flex-wrap px-3 space-y-2 mt-4">
                <h2 className="font-semibold text-center line-clamp-2">
                  {item.title}
                </h2>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                  ${item.price.toFixed(2)}
                </p>
                <button 
                    onClick={() => addToCart(item)}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 w-full">
            <p className="text-xl mb-4">No products match your filters.</p>
            <button
              onClick={resetFilters}
              className={`px-4 py-2 rounded text-white hover:transition-colors ${themeStyles.button}`}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;