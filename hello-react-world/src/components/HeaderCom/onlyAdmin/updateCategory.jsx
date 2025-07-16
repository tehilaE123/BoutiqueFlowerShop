import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../../Store/Slice/categorySlice";
import { useNavigate } from "react-router-dom";
import "./Category.css";

export default function UpdateCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

  const [searchedId, setSearchedId] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = () => {
    const idToFind = parseInt(searchedId);
    if (isNaN(idToFind)) {
      setError("יש להזין מזהה תקין");
      setCategoryData(null);
      return;
    }

    const found = categories?.find((c) => Number(c.id) === idToFind);
    if (!found) {
      setError("לא נמצאה קטגוריה עם מזהה זה");
      setCategoryData(null);
      setSuccess("");
    } else {
      setError("");
      setCategoryData({ ...found });
    }
  };

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
    if (!categoryData.name) {
      setError("יש למלא את שם הקטגוריה");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/${categoryData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: categoryData.name,
            id: categoryData.id,
          }),
        }
      );

      if (!response.ok) throw new Error("עדכון נכשל");
      setSuccess("הקטגוריה עודכנה בהצלחה!");
      setError("");
    } catch (err) {
      setError("שגיאה בעדכון הקטגוריה: " + err.message);
      setSuccess("");
    }
  };

  return (
    <div className="categoryPageWrapper">
      <div className="addProductForm">
        <h2>עדכון קטגוריה</h2>

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="הכנס מזהה קטגוריה"
            value={searchedId}
            onChange={(e) => setSearchedId(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            בדוק קטגוריה
          </button>
        </div>

        {categoryData && (
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input type="text" name="id" value={categoryData.id} disabled />
            <input
              type="text"
              name="name"
              placeholder="שם הקטגוריה"
              value={categoryData.name}
              onChange={handleChange}
            />
            <button type="submit">עדכן קטגוריה</button>
          </form>
        )}

        <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
      </div>
    </div>
  );
}
