import mongoose from "mongoose";
import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//רק למנהל
// פונקציה לקבלת כל המשתמשים
export const getAllUsers = async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// פונקציה לקבלת משתמש לפי מזהה
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const user = req.body;

  if (!user.password || !user.name || !user.email || !user.address) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  try {
    user.email = user.email.toLowerCase();
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "משתמש כבר רשום, התחבר" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.role = "user";

    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in create user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }
  try {
    const updateUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "אימייל או סיסמה שגויים" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "אימייל או סיסמה שגויים" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        role: user.role,
      },
      "8t7r5v@#hk",
      { expiresIn: "2h" }
    );

    res.send({ accessToken: token, user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send({ message: "שגיאה בשרת" });
  }
};
