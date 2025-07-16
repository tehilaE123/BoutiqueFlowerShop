import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  login,
} from "../Controller/userController.js";
import {
  logMiddleware,
  jwtMiddleware,
  IsAdminMiddleware,
} from "../Middleware.js";

const userRouter = express.Router();
userRouter.get("/test", (req, res) => {
  res.send("User router is working!");
});

userRouter.get("/", jwtMiddleware, IsAdminMiddleware, getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);

export default userRouter;
