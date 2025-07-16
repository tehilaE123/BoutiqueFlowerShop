import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../Store/Slice/productSlice";
import "./search.css";
import searchIcon from "/photos/icons/1חיפוש.png";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.products?.allProducts || []);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchTerm, allProducts]);

  function handleSearchClick() {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    } else {
      if (suggestions.length > 0) {
        navigate(`/product/${suggestions[0]._id}`);
        setSearchTerm("");
        setSuggestions([]);
        setIsSearchOpen(false);
      }
    }
  }

  function handleSuggestionClick(productId) {
    navigate(`/product/${productId}`);
    setSearchTerm("");
    setSuggestions([]);
    setIsSearchOpen(false);
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="חפש מוצר..."
        />
        <img
          src={searchIcon}
          alt="Search"
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>

      {searchTerm && (
        <ul className="suggestions-list">
          {suggestions.length > 0 ? (
            suggestions.map((product) => (
              <li
                key={product._id}
                onClick={() => handleSuggestionClick(product._id)}
              >
                <span className="dot">🌸</span> {product.name}
              </li>
            ))
          ) : (
            <li className="no-results">אין תוצאות</li>
          )}
        </ul>
      )}
    </div>
  );
}
