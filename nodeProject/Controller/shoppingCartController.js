import mongoose from "mongoose";
import ShoppingCartModel from "../models/ShoppingCartModel.js";

export const get = async (req, res) => {
  try {
    const carts = await ShoppingCartModel.find().populate("products.productId");
    res.json({ data: carts });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getById = async (req, res) => {
  try {
    // הוספת populate כדי לקבל את פרטי המוצרים
    const cart = await ShoppingCartModel.findOne({
      customerId: req.userId,
    }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Shopping cart not found" });
    }

    res.json({ data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const add = async (req, res) => {
  try {
    const customerId = req.userId;
    const productId = req.body.products[0].productId;
    const quantity = parseInt(req.body.products[0].quantity, 10);

    if (!productId || quantity <= 0)
      return res.status(400).json({ message: "Invalid input" });
    if (!customerId)
      return res.status(400).json({ message: "Missing customer ID" });

    let cart = await ShoppingCartModel.findOne({ customerId });

    if (!cart) {
      cart = new ShoppingCartModel({
        customerId,
        products: [{ productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find((p) =>
        p.productId.equals(productId)
      );
      if (existingProduct) existingProduct.quantity += quantity;
      else cart.products.push({ productId, quantity });
    }

    await cart.save();

    // החזרת העגלה עם המוצרים מאוכלסים
    const populatedCart = await ShoppingCartModel.findById(cart._id).populate(
      "products.productId"
    );

    res.status(200).json({ data: populatedCart });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await ShoppingCartModel.findOne({
      _id: cartId,
      customerId: req.userId,
    });

    if (!cart) return res.status(404).json({ message: "עגלה לא נמצאה" });

    const product = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    if (!product)
      return res.status(404).json({ message: "מוצר לא נמצא בעגלה" });

    product.quantity = quantity;
    await cart.save();

    // החזרת העגלה עם המוצרים מאוכלסים
    const populatedCart = await ShoppingCartModel.findById(cart._id).populate(
      "products.productId"
    );

    res.json({ message: "כמות עודכנה בהצלחה", data: populatedCart });
  } catch (error) {
    res.status(500).json({ message: "שגיאה בעדכון מוצר" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await ShoppingCartModel.findOne({
      _id: cartId,
      customerId: req.userId,
    });

    if (!cart) return res.status(404).json({ message: "עגלה לא נמצאה" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
    await cart.save();

    // החזרת העגלה עם המוצרים מאוכלסים
    const populatedCart = await ShoppingCartModel.findById(cart._id).populate(
      "products.productId"
    );

    res.json({ message: "המוצר נמחק בהצלחה", data: populatedCart });
  } catch (error) {
    res.status(500).json({ message: "שגיאה במחיקת מוצר" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await ShoppingCartModel.findOne({
      _id: cartId,
      customerId: req.userId,
    });

    if (!cart) return res.status(404).json({ message: "עגלה לא נמצאה" });

    cart.products = [];
    await cart.save();

    res.json({ message: "העגלה נוקתה בהצלחה", data: cart });
  } catch (error) {
    res.status(500).json({ message: "שגיאה בניקוי הסל" });
  }
};

export const update = async (req, res) => {
  try {
    const updatedCart = await ShoppingCartModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("products.productId");

    if (!updatedCart)
      return res.status(404).json({ message: "Shopping cart not found" });

    res.json({ data: updatedCart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const deletedCart = await ShoppingCartModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCart)
      return res.status(404).json({ message: "Shopping cart not found" });
    res.json({ message: "Shopping cart deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
