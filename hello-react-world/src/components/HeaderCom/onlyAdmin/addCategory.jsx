import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "../../../Store/Slice/categorySlice";
import { useNavigate } from "react-router-dom";
import "./Category.css";

export default function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);

  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, name } = categoryData;

    if (!id || !name) {
      setError("יש למלא את כל השדות!");
      return;
    }

    const existingCategory = categories.find(
      (category) => category.id === Number(id)
    );
    if (existingCategory) {
      setError("מזהה הקטגוריה כבר קיים במערכת. אנא בחרי מזהה אחר.");
      return;
    }

    const newCategory = {
      id: Number(id),
      name: name.trim(),
    };

    try {
      await dispatch(addNewCategory(newCategory)).unwrap();
      setSuccess("הקטגוריה נוספה בהצלחה!");
      setSubmitted(true);
    } catch (err) {
      setError("שגיאה בהוספת הקטגוריה: " + err.message);
    }
  };

  const addAnotherCategory = () => {
    setCategoryData({ id: "", name: "" });
    setError("");
    setSuccess("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="addCategorySuccess">
        <h2>{success}</h2>
        <div className="addCategoryButtons">
          <button onClick={addAnotherCategory}>הוספת קטגוריה נוספת +</button>
          <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
        </div>
      </div>
    );
  }

  return (
    <div className="categoryPageWrapper">
      <form className="addCategoryForm" onSubmit={handleSubmit}>
        <h2>הוסף קטגוריה חדשה:</h2>

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <input
          type="text"
          name="id"
          placeholder="מזהה קטגוריה"
          onChange={handleChange}
          value={categoryData.id}
        />
        <input
          type="text"
          name="name"
          placeholder="שם קטגוריה"
          onChange={handleChange}
          value={categoryData.name}
        />
        <button type="submit">שמור קטגוריה</button>
      </form>
    </div>
  );
}
