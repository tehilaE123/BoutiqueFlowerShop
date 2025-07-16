import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contactUs.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };
  return (
    <div className="contactUsPage">
      <h1>יש לכם שאלה? אנחנו תמיד כאן בשבילכם</h1>

      <div className="contactUsInfo">
        <p>
          <strong>טלפון:</strong> 0533135399
        </p>
        <p>
          <strong>אימייל:</strong> GardenGlow@gmail.com
        </p>
        <p>
          <strong>כתובת:</strong> דיזנגוף 50, תל אביב
        </p>
      </div>

      <div className="contactUsForm">
        <h2>שלחו לנו הודעה</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div
            className="custom-message-box"
            contentEditable
            onInput={(e) => setMessage(e.currentTarget.textContent)}
            data-placeholder="כתוב כאן את ההודעה..."
            role="textbox"
            aria-multiline="true"
          ></div>

          <button type="submit">שליחה</button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>תודה שפנית אלינו!</h2>
            <p>ההודעה התקבלה ונחזור אליך בהקדם האפשרי.</p>
            <button onClick={handleCloseModal}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}
