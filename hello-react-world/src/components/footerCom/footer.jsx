import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Store/Slice/categorySlice.js";
import "./Footer.css";

export default function Footer() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <footer className="footer">
      <div className="footer-column">
        <h4 className="footer-title">קטגוריות</h4>
        {categories?.map((cat) => (
          <Link key={cat._id} to={`/category/${cat.id}`}>
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="footer-column">
        <h4 className="footer-title">מידע על החברה</h4>
        <Link to="/about">אודות</Link>
        <Link to="/policy">תקנון</Link>
      </div>

      <div className="footer-column">
        <h4 className="footer-title">שירות לקוחות</h4>
        <Link to="/contact">צור קשר</Link>
        <Link to="/branches">הסניפים שלנו</Link>
      </div>

      <div className="footer-copyright">
        כל הזכויות שמורות © GardenGlow 2025
      </div>
    </footer>
  );
}
