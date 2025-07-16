import React, { useState } from "react";
import { Box, TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../Store/Slice/orderSlice";
import { clearCartState, clearCartServer } from "../../Store/Slice/cartSlice";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = location.state?.totalPrice || 0;

  const currentUser = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartId = useSelector((state) => state.cart.cartId);

  const [form, setForm] = useState({
    fullName: currentUser?.name || "",
    email: currentUser?.email || "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!currentUser?._id) {
      alert("שגיאה: לא נמצא משתמש מחובר");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("שגיאה: סל הקניות ריק");
      return;
    }

    if (
      !form.fullName ||
      !form.email ||
      !form.cardNumber ||
      !form.expiry ||
      !form.cvv
    ) {
      alert("נא למלא את כל השדות");
      return;
    }

    const orderProducts = cartItems.map((item) => ({
      product_Id: item.productId || item._id,
      quantity: item.quantity,
    }));

    const order = {
      user_Id: currentUser._id,
      products: orderProducts,
      status: "סופק",
      OrderDate: new Date().toISOString(),
    };

    try {
      const action = await dispatch(addOrder(order));

      if (action.type.endsWith("/fulfilled")) {
        const createdOrder = action.payload;

        if (cartId) {
          await dispatch(clearCartServer(cartId));
        }
        dispatch(clearCartState());

        navigate("/orderSuccess", {
          state: {
            order: createdOrder,
            total: totalPrice,
            fullName: currentUser.name,
            email: currentUser.email,
          },
        });
      } else {
        alert("הזמנה נכשלה. נא לנסות שוב.");
      }
    } catch (error) {
      alert("הזמנה נכשלה. נא לנסות שוב.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fffdf9",
        minHeight: "100vh",
        py: 10,
        px: 2,
        boxSizing: "border-box",
        fontFamily: "Assistant, sans-serif",
      }}
    >
      <Paper
        sx={{
          maxWidth: 900,
          margin: "auto",
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          direction: "rtl",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#0e030a", mb: 2 }}
        >
          תשלום והזמנה
        </Typography>

        <Typography variant="h6" align="center" sx={{ color: "#444", mb: 4 }}>
          סכום כולל: ₪{totalPrice.toFixed(2)}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="שם מלא"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="אימייל"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="מספר כרטיס אשראי"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="תוקף"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="CVV"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="xxx"
              required
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!currentUser || !cartItems || cartItems.length === 0}
              sx={{
                backgroundColor: "#2c2c2c",
                color: "#fff",
                fontSize: "16px",
                paddingY: "12px",
                "&:hover": {
                  backgroundColor: "#1f1f1f",
                },
              }}
            >
              שלם עכשיו - ₪{totalPrice.toFixed(2)}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
