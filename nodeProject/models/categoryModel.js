import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
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
      minLength: 2,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, collection: "category" }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
