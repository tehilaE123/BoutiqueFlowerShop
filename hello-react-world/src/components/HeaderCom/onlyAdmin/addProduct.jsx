import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../../Store/Slice/productSlice";
import { fetchCategories } from "../../../Store/Slice/categorySlice";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

    const { id, name, description, price, image, categoryId } = productData;

    if (!id || !name || !description || !price || !image || !categoryId) {
      setError("יש למלא את כל השדות!");
      return;
    }

    const existingProduct = products.find(
      (product) => product.id === Number(id)
    );
    if (existingProduct) {
      setError("מזהה המוצר כבר קיים במערכת. אנא בחרי מזהה אחר.");
      return;
    }

    const newProduct = {
      ...productData,
      id: Number(id),
      price: Number(price),
      categoryId: Number(categoryId),
    };

    try {
      await dispatch(addNewProduct(newProduct)).unwrap();
      setSuccess("המוצר נוסף בהצלחה!");
      setSubmitted(true);
    } catch (err) {
      setError("שגיאה בהוספת המוצר: " + err.message);
    }
  };

  const addAnotherProduct = () => {
    setProductData({
      id: "",
      name: "",
      description: "",
      price: "",
      image: "",
      categoryId: "",
    });
    setError("");
    setSuccess("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="productPageWrapper">
        <div className="addProductSuccess">
          <h2>{success}</h2>
          <div className="addProductButtons">
            <button onClick={addAnotherProduct}>הוספת מוצר נוסף +</button>
            <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productPageWrapper">
      <form className="addProductForm" onSubmit={handleSubmit}>
        <h2>הוסף מוצר חדש לאתר:</h2>

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <input
          type="text"
          name="id"
          placeholder="מזהה מוצר"
          onChange={handleChange}
          value={productData.id}
        />
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
        <select
          name="categoryId"
          onChange={handleChange}
          value={productData.categoryId}
        >
          <option value="">בחר קטגוריה</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">שמור מוצר</button>
      </form>
    </div>
  );
}
