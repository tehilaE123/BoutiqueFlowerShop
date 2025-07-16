import express from "express";
import {
  get,
  getById,
  add,
  update,
  updateProduct,
  removeProduct,
  clearCart,
  deleteCart,
} from "../Controller/shoppingCartController.js";
import { jwtMiddleware } from "../Middleware.js";

const router = express.Router();

router.get("/", jwtMiddleware, get);
router.get("/user", jwtMiddleware, getById);
router.post("/add", jwtMiddleware, add);
router.put("/:cartId/products/:productId", jwtMiddleware, updateProduct);
router.put("/:id", jwtMiddleware, update);
router.delete("/:cartId/products/:productId", jwtMiddleware, removeProduct);
router.delete("/:cartId/clear", jwtMiddleware, clearCart);
router.delete("/:id", jwtMiddleware, deleteCart);

export default router;
