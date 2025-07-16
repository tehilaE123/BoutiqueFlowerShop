import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const location = useLocation();
  const passedTotal = location.state?.total;

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return (
      <Box sx={{ mt: 10, textAlign: "center", color: "#888" }}>
        <Typography variant="h5">הזמנה לא נמצאה</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "60px auto",
        padding: "30px",
        backgroundColor: "#fffdf9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        fontFamily: "Assistant, sans-serif",
        direction: "rtl",
        color: "#333",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#0e030a",
          fontSize: "32px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        פרטי הזמנה
      </Typography>

      <Typography
        sx={{ fontSize: "14px", color: "#888", textAlign: "center", mb: 4 }}
      >
        מזהה הזמנה: {order._id}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography>
          <strong>תאריך:</strong>{" "}
          {new Date(order.OrderDate).toLocaleString("he-IL")}
        </Typography>
        <Typography>
          <strong>סטטוס:</strong> {order.status}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ color: "#444", mb: 2 }}>
        מוצרים בהזמנה:
      </Typography>

      <List>
        {order.products.map((item, idx) => (
          <ListItem
            key={idx}
            alignItems="flex-start"
            sx={{
              mb: 1.5,
              background: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              p: 2,
            }}
          >
            <img
              src={item.product_Id?.image}
              alt={item.product_Id?.name}
              width={80}
              height={80}
              style={{ marginLeft: 16, borderRadius: 8, objectFit: "cover" }}
            />
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.product_Id?.name || "לא ידוע"}
                </Typography>
              }
              secondary={`כמות: ${item.quantity} | מחיר: ₪${item.product_Id?.price}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography
        variant="h6"
        sx={{ mt: 4, fontWeight: "bold", fontSize: "18px" }}
      >
        סך הכול לתשלום: ₪{passedTotal?.toLocaleString() || "לא זמין"}
      </Typography>

      <Button
        sx={{
          mt: 3,
          backgroundColor: "#2c2c2c",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1f1f1f",
          },
        }}
        onClick={() => navigate(-1)}
      >
        חזרה לרשימת ההזמנות
      </Button>
    </Box>
  );
}
