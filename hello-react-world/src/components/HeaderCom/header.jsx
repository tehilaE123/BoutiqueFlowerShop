import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./searchCom/search";
import "./Header.css";
import { fetchCategories } from "../../Store/Slice/categorySlice.js";

export default function Header() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.currentUser);

  const userRole = currentUser?.role || "guest";
  const isAdmin = userRole === "admin";

  return (
    <header className="main-header">
      <div className="top-header">
        <div className="header-left">
          <SearchBar />
        </div>
        <div className="header-right">
          <Link to="/cart" className="icon-button">
            <img src="/photos/cart.png" alt="סל קניות" />
          </Link>

          {isAdmin && (
            <Link to="/admin" className="admin-button">
              Manager
            </Link>
          )}

          {currentUser ? (
            <Link to="/account" className="icon-button">
              <img
                src="/photos/icons/התחברות.png"
                alt="החשבון שלי"
                className="user-icon"
              />
            </Link>
          ) : (
            <Link to="/login" className="icon-button">
              <img
                src="/photos/icons/התחברות.png"
                alt="התחברות"
                className="user-icon"
              />
            </Link>
          )}
        </div>

        <div className="logo">
          <Link to="/">
            <img src="/photos/Logo.png" alt="לוגו" />
          </Link>
        </div>
      </div>

      <nav className="nav-bar">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.id}`}
            className="nav-category"
          >
            <img
              src={category.image}
              alt={category.name}
              className="nav-category-img"
            />
            <span>{category.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
