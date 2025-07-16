import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../Store/Slice/orderSlice";
import "./myOrders.css";

export default function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const userOrders = orders.filter(
    (order) => order.user_Id === currentUser._id
  );

  const calculateTotal = (order) => {
    return order.products?.reduce((acc, item) => {
      const price = item.product_Id?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  return (
    <div className="policy-container">
      <h1>ההזמנות שלי</h1>

      {userOrders.length === 0 ? (
        <div>
          <p className="last-updated">אין הזמנות להצגה</p>
          <p>ברגע שתבצעי רכישה – פרטי ההזמנה יופיעו כאן 💐</p>
        </div>
      ) : (
        userOrders.map((order) => (
          <section key={order._id}>
            <h2>מספר הזמנה: {order._id}</h2>
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
            <Button
              component={Link}
              to={`/orderDetails/${order._id}`}
              state={{
                total: calculateTotal(order),
              }}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#444",
                },
              }}
            >
              לצפייה בפרטי ההזמנה
            </Button>
          </section>
        ))
      )}
    </div>
  );
}
