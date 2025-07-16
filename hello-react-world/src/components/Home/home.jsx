import React, { useState } from "react";
import "./home.css";

const inspirationImages = [
  "/photos/home/1.jpg",
  "/photos/home/2.jpg",
  "/photos/home/3.jpg",
  "/photos/home/4.jpg",
  "/photos/home/5.jpg",
  "/photos/home/6.jpg",
  "/photos/home/7.jpg",
  "/photos/home/8.jpg",
  "/photos/home/9.jpg",
  "/photos/home/10.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % inspirationImages.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? inspirationImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="home-page">
     
      <section className="welcome-section">
        <h1>ברוכים הבאים לעולם של GardenGlow</h1>
        <p>
          אצלנו, כל פרח מספר סיפור, וכל אגרטל נוגע בלב. GardenGlow היא חוויה של
          עיצוב, השראה וטבע – בדיוק כמו שחלמתם.
          <br />
          בחרנו עבורכם בקפידה אוסף ייחודי של אגרטלים, עציצים ופרחים מלאי אופי,
          שישדרגו כל חלל בבית ויהפכו אותו לחמים, אלגנטי ומלא חיים.
          <br />
          מוזמנים לשוטט, להתאהב, ולהכניס הביתה אור, רוגע וסטייל.
        </p>
      </section>

     
      <section className="inspiration-section">
        <h2>השראה לעיצוב הבית</h2>
        <div className="carousel-container">
          <button className="arrow left" onClick={prev}>
            ❮
          </button>
          <img
            src={inspirationImages[current]}
            alt={`השראה ${current + 1}`}
            className="carousel-image"
          />
          <button className="arrow right" onClick={next}>
            ❯
          </button>
        </div>
      </section>

      <section className="video-section">
        <h2>עיצוב הפרחים שלנו:</h2>
        <div className="video-wrapper">
          <video
            src="/photos/home/video.mp4"
            controls
            className="video-element"
          />
        </div>
      </section>

      <section className="testimonials">
        <h2>לקוחות מספרים</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>“אהבתי ממש, מוסיף לבית המון”

            </p>
            <span>- דבורי פ.</span>
          </div>
          <div className="testimonial-card">
            <p>“הגיע מהר, בדיוק כמו בתמונה. מתנה מושלמת!”</p>
            <span>- חוי א.</span>
          </div>
          <div className="testimonial-card">
            <p>“מבחר מהמם, האגרטלים הכי יפים שראיתי!”</p>
            <span>- אביטל ז.</span>
          </div>
          <div className="testimonial-card">
            <p>“הבית שלי פשוט קיבל חיים חדשים!”</p>
            <span>- מיכל ע.</span>
          </div>
          <div className="testimonial-card">
            <p>“מקבלת מלא מחמאות על האגרטלים, השוקלדים ברמה אחרת”</p>
            <span>- רננה א.</span>
          </div>
          <div className="testimonial-card">
            <p>“הריח של הפרחים מורגש בכל הבית!!!!”</p>
            <span>- מימי ס.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
