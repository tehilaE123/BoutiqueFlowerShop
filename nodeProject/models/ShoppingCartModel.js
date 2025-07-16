import mongoose from "mongoose";

const ShoppingCartSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        _id: false,
      },
    ],
  },
  { versionKey: false, collection: "shoppingCart" }
);

const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);
export default ShoppingCart;
