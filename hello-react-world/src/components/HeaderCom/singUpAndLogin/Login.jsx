import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../../Store/Slice/userSlice";
import "./design.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ SwitchToSignUp }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUserThunk(userData)).unwrap();
      navigate("/account"); //מעביר לדף החשבון
    } catch (error) {
      setMessage("שגיאה בהתחברות: " + error.message);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>Login</h2>
        <p>Please enter your e-mail and password:</p>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <div className="passwordWrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span
              className="passwordToggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">LOGIN</button>
        </form>

        <p
          className={`loginMessage ${message.includes("שגיאה") ? "error" : ""}`}
        >
          {message}
        </p>

        <p className="bottomText">
          Don't have an account?{" "}
          <button type="button" className="switchLink" onClick={SwitchToSignUp}>
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
