import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductById,
  fetchAllProducts,
} from "../../../Store/Slice/productSlice";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const [searchedId, setSearchedId] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleSearch = () => {
    const idToFind = parseInt(searchedId);
    if (isNaN(idToFind)) {
      setError("יש להזין מספר מזהה תקין");
      setProductData(null);
      return;
    }

    const found = products?.find((p) => Number(p.id) === idToFind);
    if (!found) {
      setError("לא נמצא מוצר עם מזהה זה");
      setProductData(null);
      setSuccess("");
    } else {
      setError("");
      setProductData({ ...found });
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, image, categoryId } = productData;
    if (!name || !description || !price || !image || !categoryId) {
      setError("יש למלא את כל השדות!");
      return;
    }

    const updatedProduct = {
      ...productData,
      price: Number(price),
      categoryId: Number(categoryId),
    };

    try {
      await dispatch(
        updateProductById({ id: productData.id, updateData: updatedProduct })
      ).unwrap();
      setSuccess("המוצר עודכן בהצלחה!");
    } catch (err) {
      setError("שגיאה בעדכון המוצר: " + err.message);
    }
  };

  return (
    <div className="productPageWrapper">
      <div className="addProductForm">
        <h2>עדכון מוצר לפי מזהה</h2>

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="הכנס מזהה מוצר לעדכון"
            value={searchedId}
            onChange={(e) => setSearchedId(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            בדוק מוצר
          </button>
        </div>

        {productData && (
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input type="text" name="id" value={productData.id} disabled />
            <input
              type="text"
              name="name"
              placeholder="שם מוצר"
              onChange={handleChange}
              value={productData.name}
            />
            <input
              type="text"
              name="description"
              placeholder="תיאור מוצר"
              onChange={handleChange}
              value={productData.description}
            />
            <input
              type="text"
              name="price"
              placeholder="מחיר מוצר"
              onChange={handleChange}
              value={productData.price}
            />
            <input
              type="text"
              name="image"
              placeholder="כתובת תמונה"
              onChange={handleChange}
              value={productData.image}
            />
            <input
              type="text"
              name="categoryId"
              placeholder="מזהה קטגוריה"
              onChange={handleChange}
              value={productData.categoryId}
            />
            <button type="submit">עדכן מוצר</button>
          </form>
        )}

        <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
      </div>
    </div>
  );
}
