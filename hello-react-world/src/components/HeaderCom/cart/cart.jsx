import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart1,
  updateQuantity,
  removeFromCart,
  clearCartState,
  clearCartServer,
} from "../../../Store/Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartId = useSelector((state) => state.cart.cartId);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCart1());
    }
  }, [dispatch]);

  const fullCartItems = cartItems
    .map((item) => {
      const product = item.productId;

      if (!product || typeof product === "string") {
        console.warn(`Product not populated for item:`, item);
        return null;
      }

      return {
        ...product,
        quantity: item.quantity || 1,
        cartItemId: item._id || product._id,
      };
    })
    .filter(Boolean);

  const totalPrice = fullCartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleQuantityIncrease = (id) => {
    const item = fullCartItems.find((item) => item._id === id);
    if (item) {
      dispatch(
        updateQuantity({
          cartId,
          productId: id,
          quantity: item.quantity + 1,
        })
      );
    }
  };

  const handleQuantityDecrease = (id) => {
    const item = fullCartItems.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      dispatch(
        updateQuantity({
          cartId,
          productId: id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ cartId, productId: id }));
  };

  const handleClearCart = () => {
    dispatch(clearCartServer(cartId));
    dispatch(clearCartState());
    setShowClearModal(false);
  };

  const handleToOrder = () => {
    navigate("/payment", { state: { totalPrice, cartItems: fullCartItems } });
  };

  if (error) {
    return (
      <div className="cartWrapper">
        <div className="cartContainer">
          <p className="errorMessage">שגיאה: {error}</p>
          <button onClick={() => dispatch(fetchCart1())}>נסה שנית</button>
        </div>
      </div>
    );
  }

  if (!fullCartItems.length) {
    return (
      <div className="cartWrapper">
        <div className="cartContainer">
          <p className="emptyCartMessage">העגלה שלך ריקה</p>
          <button onClick={() => navigate("/")}>עבור לקניות</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cartWrapper">
      <div className="cartContainer">
        <h2>סל הקניות שלך:</h2>

        <div className="cartList">
          {fullCartItems.map((item) => (
            <div key={item._id} className="cartItem">
              <div className="itemImage">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "/default-product-image.jpg";
                    }}
                  />
                ) : (
                  <div className="noImage">אין תמונה</div>
                )}
              </div>

              <div className="itemDetails">
                <h3>{item.name}</h3>
                <p className="itemPrice">₪{item.price}</p>
                {item.description && (
                  <p className="itemDescription">{item.description}</p>
                )}
              </div>

              <div className="quantityControls">
                <button
                  className="quantityBtn decrease"
                  onClick={() => handleQuantityDecrease(item._id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantityBtn increase"
                  onClick={() => handleQuantityIncrease(item._id)}
                >
                  +
                </button>
              </div>

              <div className="itemTotal">
                <span>₪{(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <button
                className="removeBtn"
                onClick={() => handleRemove(item._id)}
                aria-label="מחק מוצר"
              >
                <img
                  src="\photos\icons\פח.png"
                  alt="מחק מוצר"
                  className="delete-icon-img"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="cartSummary">
          <div className="totalPrice">
            <h3>סכום כולל: ₪{totalPrice.toFixed(2)}</h3>
          </div>

          <div className="cartActions">
            <button
              className="clearCartBtn"
              onClick={() => setShowClearModal(true)}
            >
              נקה סל
            </button>

            <button className="checkoutBtn" onClick={handleToOrder}>
              לתשלום
            </button>
          </div>
        </div>
      </div>

      {showClearModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>ניקוי סל</h3>
            <p>האם את/ה בטוח/ה שברצונך למחוק את כל המוצרים מהסל?</p>
            <div className="modal-buttons">
              <button onClick={handleClearCart}>אישור</button>
              <button onClick={() => setShowClearModal(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
