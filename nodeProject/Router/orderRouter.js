import express from "express";
import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../Controller/OrderController.js";

const orderRouter = express.Router();
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", addOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
