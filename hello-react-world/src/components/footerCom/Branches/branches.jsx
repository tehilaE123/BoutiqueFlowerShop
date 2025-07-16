import React from "react";
import "./branches.css";

export default function Branches() {
  const branches = [
    {
      id: 1,
      name: "סניף תל אביב",
      address: "רחוב דיזנגוף 100, תל אביב",
      hours: "א'-ה' 09:00-21:00, ו' 09:00-14:00",
      phone: "03-1234567",
    },
    {
      id: 2,
      name: "סניף חיפה",
      address: "שדרות בן גוריון 45, חיפה",
      hours: "א'-ה' 10:00-20:00, ו' 09:00-13:00",
      phone: "04-7654321",
    },
    {
      id: 3,
      name: "סניף ירושלים",
      address: "רחוב יפו 34, ירושלים",
      hours: "א'-ה' 10:00-22:00, ו' 09:00-14:00",
      phone: "02-9876543",
    },
  ];

  return (
    <div className="branches-page">
      <h1 className="branches-title">הסניפים שלנו</h1>
      <div className="branches-grid">
        {branches.map((branch) => (
          <div key={branch.id} className="branch-card">
            <h2 className="branch-name">
              <img
                src="/photos/icons/פרח1.png"
                alt="פרח"
                className="flower-icon"
              />
              {branch.name}
            </h2>
            <p>
              <strong>כתובת:</strong> {branch.address}
            </p>
            <p>
              <strong>שעות פתיחה:</strong> {branch.hours}
            </p>
            <p>
              <strong>טלפון:</strong> {branch.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
