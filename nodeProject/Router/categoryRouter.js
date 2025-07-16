import express from "express";
import {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
} from "../Controller/categoryController.js";

const categoryRouter = express.Router();
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", addCategory);
categoryRouter.put("/:id", updateCategory);

export default categoryRouter;
