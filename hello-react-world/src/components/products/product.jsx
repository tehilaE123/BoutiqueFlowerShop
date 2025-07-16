import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/Slice/cartSlice";

export default function ProductCard({ product, onRequireLogin }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    const userId = currentUser?._id;
    if (!token) {
      onRequireLogin();
      return;
    }

    if (!token || !userId || !product) {
      return;
    }
    dispatch(addToCart({ product, token, quantity: 1 }));
  };

  return (
    <div className="product-card">
      <Link className="product-image-link" to={`/product/${product._id}`}>
        <img className="product-image" src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price">{product.price} ₪</div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          הוסף לסל
        </button>
      </div>
    </div>
  );
}
