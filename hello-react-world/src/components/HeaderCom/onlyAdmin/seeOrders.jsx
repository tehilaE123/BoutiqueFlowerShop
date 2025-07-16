import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../Store/Slice/orderSlice";
import { fetchAllUsers } from "../../../Store/Slice/userSlice";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./seeOrders.css";

export default function SeeOrders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);
  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const getUserDetails = (userId) => {
    const user = allUsers.find((u) => u._id === userId);
    return user ? `${user.name} (${user.email})` : "משתמש לא ידוע";
  };

  const calculateTotal = (order) => {
    return order.products?.reduce((acc, item) => {
      const price = item.product_Id?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  return (
    <div className="ordersContainer">
      <div className="ordersBox">
        <h2>כל ההזמנות באתר</h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>אין הזמנות להצגה</p>
        ) : (
          orders.map((order) => (
            <section key={order._id} className="admin-order-card">
              <h3>מספר הזמנה: {order._id}</h3>
              <p>
                <strong>משתמש:</strong> {getUserDetails(order.user_Id)}
              </p>
              <p>
                <strong>תאריך:</strong>{" "}
                {new Date(order.OrderDate).toLocaleString("he-IL")}
              </p>
              <p>
                <strong>סטטוס:</strong> {order.status}
              </p>
              <p>
                <strong>סה״כ לתשלום:</strong> ₪
                {calculateTotal(order).toLocaleString()}
              </p>

              <Link
                to={`/orderDetails/${order._id}`}
                state={{ total: calculateTotal(order) }}
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                לצפייה בפרטי ההזמנה
              </Link>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
