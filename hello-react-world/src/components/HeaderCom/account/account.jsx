import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../Store/Slice/userSlice";
import { useEffect } from "react";
import "./account.css";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userRole = currentUser?.role;

  const Logout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="accountContainer">
      <h2>
        החשבון שלי
        {userRole === "admin" && (
          <span className="adminLabel">- מנהל האתר</span>
        )}
      </h2>
      {currentUser ? (
        <div className="accountDetails">
          <p>
            <strong>ברוך הבא, </strong>
            {currentUser.name}
          </p>
          <p>
            <strong>אימייל: </strong>
            {currentUser.email}
          </p>

          <div className="accountButtons">
            <Link to="/" className="buttonHomePage">
              חזרה לדף הבית
            </Link>
            <button onClick={Logout}>התנתקות</button>
            <button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/myOrders")}
            >
              ההזמנות שלי
            </button>
          </div>
        </div>
      ) : (
        <p>אנא התחבר כדי לצפות בפרטי החשבון</p>
      )}
    </div>
  );
}
