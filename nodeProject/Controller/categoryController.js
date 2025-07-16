import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const category_Id = await Category.findById(req.params.id);
    res.json(category_Id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addCategory = async (req, res) => {
  const category = req.body; //המשתמש שלח את המידע וזה נשמר במשתנה זה

  if (!category.id || !category.name || !category.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newCategory = new Category(category); //יוצרים קטגוריה חדשה עם המידע שהמשתמש שלח

  try {
    await newCategory.save(); //מנסה לשמור את הקטגוריה במסד הנתונים
    res.status(201).json({ success: true, data: newCategory }); //אם הצליח מחזיר 201 עם המידע החדש
  } catch (error) {
    //אם לא הצליח יחזיר error
    console.error("Error in create category:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  const category = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //בודק האם המזהה תקין לפי הכללים של מונגוס
    return res
      .status(404)
      .json({ success: false, message: "Invalid Category Id" });
  }
  try {
    //מחפשים את הקטגוריה לפי ה־id הזה, ומעדכנים אותו עם המידע החדש
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      category,
      image,
      {
        new: true,
      }
    );
    //new: true אומר: תחזיר לי את האובייקט המעודכן, לא את הישן
    res.status(200).json({ success: true, data: updateCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
