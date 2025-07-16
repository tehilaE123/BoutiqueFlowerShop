import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, collection: "products" }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
