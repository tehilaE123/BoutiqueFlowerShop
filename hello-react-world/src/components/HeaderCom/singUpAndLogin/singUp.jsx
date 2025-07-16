import react, { useState } from "react";
import { signUpUserThunk } from "../../../Store/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./design.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp({ SwitchToLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    password: "",
    name: "",
    email: "",
    address: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setMessage("הסיסמאות אינן תואמות.");
      return;
    }

    try {
      await dispatch(signUpUserThunk(userData)).unwrap();
      setShowModal(true); // פתיחת המודאל
    } catch (error) {
      const errorMsg = typeof error === "string" ? error : error?.message || "";
      if (errorMsg.includes("משתמש כבר רשום")) {
        setMessage("משתמש זה כבר קיים. נא לעבור להתחברות.");
      } else {
        setMessage("שגיאה בהרשמה: " + errorMsg);
      }
    }
  };

  const handleCloseModal = () => {
    console.log("Going to login...");
    setShowModal(false);
    SwitchToLogin();
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>Sign Up</h2>
        <p className="creatAccount">Create your account:</p>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
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

          <div className="passwordWrapper">
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <span
              className="passwordToggle"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">SIGN UP</button>
        </form>

        <p
          className={`signUpMessage ${
            message.includes("שגיאה") || message.includes("כבר קיים")
              ? "error"
              : ""
          }`}
        >
          {message}
        </p>

        <p className="bottomText">
          Already have an account?{" "}
          <button type="button" className="switchLink" onClick={SwitchToLogin}>
            Login
          </button>
        </p>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>הרשמה בוצעה בהצלחה!</h2>
            <p>כעת באפשרותך להתחבר לחשבונך:</p>
            <button onClick={handleCloseModal}>המשך להתחברות</button>
          </div>
        </div>
      )}
    </div>
  );
}
