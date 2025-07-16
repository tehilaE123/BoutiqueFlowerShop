import mongoose from "mongoose";
import Product from "../models/productsModel.js";

// קבלת כל המוצרים או סינון לפי קטגוריה
export const getAllProducts = async (req, res) => {
  try {
    // אם יש פרמטר של categoryId בשאילתה, נשתמש בו לסינון
    // אחרת נקבל את כל המוצרים
    const { categoryId } = req.query;
    // בדיקה אם categoryId הוא מספר תקין
    const filter = categoryId ? { categoryId: Number(categoryId) } : {};
    // אם categoryId לא תקין, נחזיר שגיאה
    const products = await Product.find(filter);
    // אם לא נמצאו מוצרים, נחזיר הודעה מתאימה
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // אם קרתה שגיאה, נדפיס אותה לקונסול ונחזיר הודעת שגיאה
    console.error("Error in getAllProducts:", error);
    // נוודא שהשגיאה היא שגיאת שרת
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// קבלת מוצר לפי מזהה
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ObjectId" });
    }

    const product = await Product.findById(id); // שימוש ב־_id

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// הוספת מוצר חדש
export const addProduct = async (req, res) => {
  const product = req.body;

  if (
    product.id === undefined ||
    !product.name ||
    !product.description ||
    product.price === undefined ||
    !product.image ||
    product.categoryId === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    // בדיקה אם כבר קיים מוצר עם אותו id
    const existingProduct = await Product.findOne({ id: product.id });
    if (existingProduct) {
      return res
        .status(409)
        .json({ success: false, message: "Product ID already exists" });
    }

    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// עדכון מוצר לפי id (לא לפי ObjectId)
export const updateProduct = async (req, res) => {
  // נוודא שהמזהה הוא מספר תקין
  const { id } = req.params;
  const product = req.body;

  // בדיקה אם כל השדות הנדרשים קיימים
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    // נוודא שהמזהה הוא מספר תקין
    const updatedProduct = await Product.findOneAndUpdate(
      { id: numericId },
      product,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
