import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    password: {
      type: String, 
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minLenth: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [
        {
          validator: (value) => {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              value
            );
          },
          message: "אימייל לא תקין",
        },
      ],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    role: {
      type: String,
      required: true, 
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { versionKey: false, collection: "users" }
);
const User = mongoose.model("User", userSchema);
export default User;
