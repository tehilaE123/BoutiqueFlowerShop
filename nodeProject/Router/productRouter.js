import express from "express";
import {
  getAllProducts,
  getProductById,
  //getProductsByCategoryId,
  addProduct,
  updateProduct,
} from "../Controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", addProduct); //הוספה
productRouter.put("/:id", updateProduct); //עדכון
export default productRouter;
