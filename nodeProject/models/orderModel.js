import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId, // מזהה של המשתמש
      required: true,
      ref: "User", // רפרנס למודל של משתמש אם קיים
    },
    products: [
      {
        product_Id: {
          type: mongoose.Schema.Types.ObjectId, // מזהה של המוצר
          required: true,
          ref: "Product", // רפרנס למודל של מוצר אם קיים
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    OrderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      enum: ["ממתין", "נשלח", "סופק", "בוטל"],
      default: "ממתין",
    },
  },
  { versionKey: false, collection: "orders" }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
