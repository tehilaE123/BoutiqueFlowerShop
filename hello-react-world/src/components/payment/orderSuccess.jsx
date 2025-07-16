import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, total, fullName, email } = location.state || {};

  if (!order) return <p>שגיאה בטעינת ההזמנה</p>;

  return (
    <Box
      sx={{
        backgroundColor: "#fffdf9",
        minHeight: "100vh",
        py: 10,
        px: 2,
        fontFamily: "Assistant, sans-serif",
        direction: "rtl",
      }}
    >
      <Paper
        sx={{
          maxWidth: 700,
          margin: "auto",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "#0e030a" }}>
          ההזמנה התקבלה בהצלחה 🎉
        </Typography>

        <Typography variant="h6" sx={{ color: "#444", mb: 3 }}>
          תודה רבה על קנייתך!
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>מספר הזמנה:</strong> {order._id}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>סכום כולל:</strong> ₪{total?.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>תאריך:</strong>{" "}
          {new Date(order.OrderDate).toLocaleDateString("he-IL")}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>נשלח ל:</strong> {fullName} | <strong>אימייל:</strong> {email}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 5 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2c2c2c",
              color: "#fff",
              px: 3,
              "&:hover": {
                backgroundColor: "#1f1f1f",
              },
            }}
            onClick={() => navigate("/myOrders")}
          >
            לצפייה בהזמנות שלי
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#2c2c2c",
              color: "#2c2c2c",
              px: 3,
              "&:hover": {
                borderColor: "#1f1f1f",
                color: "#1f1f1f",
              },
            }}
            onClick={() => navigate("/")}
          >
            חזרה לדף הבית
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
