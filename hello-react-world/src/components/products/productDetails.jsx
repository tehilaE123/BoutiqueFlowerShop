import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../../Store/Slice/productSlice";
import { addToCart } from "../../Store/Slice/cartSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./productDetails.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.selectedProduct);
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartLoading = useSelector((state) => state.cart.loading);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product)
    return (
      <div className="loaderContainer">
        <div className="spinner"></div>
      </div>
    );

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    const userId = currentUser?._id;

    if (!token) {
      setShowModal(true);
      return;
    }

    if (!userId || !product) {
      return;
    }

    dispatch(addToCart({ product, quantity, token }));
  };

  return (
    <div className="product-details-wrapper">
      <img
        className="product-details-image"
        src={product.image}
        alt={product.name}
      />
      <div className="product-details-info">
        <h2>{product.name}</h2>
        <p className="price">{product.price} ₪</p>
        <p className="product-description">
          {product.description || "אין תיאור זמין"}
        </p>

        <div className="quantity-control">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={cartLoading}
        >
          {cartLoading ? "מוסיף לסל..." : "הוסף לסל"}
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>לא ניתן להוסיף מוצר לסל</h2>
            <p>יש להתחבר או להירשם כדי להוסיף מוצרים לעגלה</p>
            <div className="modal-buttons">
              <button onClick={() => navigate("/Login")}>להרשמה</button>
              <button onClick={() => navigate("/")}>לדף הבית</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
