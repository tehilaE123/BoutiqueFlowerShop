import { Link } from "react-router-dom";
import "./buttonAdmin.css";
export default function ButtonAdmin() {
  return (
    <div className="buttonAdmin">
      <Link to="/addProduct" className="buttonsToAdmin">
        <span className="Text">הוספת מוצר</span>
        <img src="/photos/icons/פרח1.png" alt="icon" className="Icon" />
      </Link>
      <Link to="/updateProduct" className="buttonsToAdmin">
        <span className="Text">עדכון מוצר</span>
        <img src="/photos/icons/פרח1.png" alt="icon" className="Icon" />
      </Link>
      <Link to="/addCategory" className="buttonsToAdmin">
        <span className="Text">הוספת קטגוריה</span>
        <img src="/photos/icons/פרח1.png" alt="icon" className="Icon" />
      </Link>
      <Link to="/updateCategory" className="buttonsToAdmin">
        <span className="Text">עדכון קטגוריה</span>
        <img src="/photos/icons/פרח1.png" alt="icon" className="Icon" />
      </Link>
      <Link to="/seeUsers" className="buttonsToAdmin">
        <span className="Text">הצגת משתמשים</span>
        <img src="/photos/icons/פרח1.png" alt="icon" className="Icon" />
      </Link>
      <Link to="/seeOrders" className="buttonsToAdmin">
        <span className="Text">הצגת הזמנות מהאתר</span>
        <img src="/photos/icons/פרח1.png" alt="icon" className="Icon" />
      </Link>
    </div>
  );
}
