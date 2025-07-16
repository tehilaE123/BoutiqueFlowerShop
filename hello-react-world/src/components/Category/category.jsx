import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../products/product.jsx";
import "./Category.css";
import { fetchProducts } from "../../Store/Slice/productSlice.js";
import { fetchCategories } from "../../Store/Slice/categorySlice.js";

export default function CategoryPage() {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);

  //ברגע שהקטגוריה משתנה, נטען את המוצרים שלה
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProducts(categoryId));
    }
    dispatch(fetchCategories());
  }, [dispatch, categoryId]);

  const filteredProducts = products.filter(
    (product) => product.categoryId === Number(categoryId)
  );

  const category = categories.find((cat) => cat.id === Number(categoryId));

  return (
    <div className="category-page">
      <h2> מוצרים מקטגורית {category?.name || `קטגוריה ${categoryId}`}</h2>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <p>טוען מוצרים...</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequireLogin={() => setShowModal(true)}
            />
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>לא ניתן להוסיף מוצר לסל</h2>
            <p>יש להתחבר או להירשם כדי להוסיף מוצרים לעגלה</p>
            <div className="modal-buttons">
              <button onClick={() => navigate("/Login")}>להרשמה</button>
              <button onClick={() => navigate("/")}>לדף הבית</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
