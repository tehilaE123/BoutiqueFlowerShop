import dotenv from "dotenv";
//טעינת הנתונים מקובץ שמכיל את משתני הסביבה
dotenv.config();

import mongoose from "mongoose";

const uri = process.env.DB_URI; //קבלת כתובת ההתחברות מתוך משתנה סביבה
console.log(uri);

// זימון הפונקציה מספרית מונגוס להתחברות
const connectDB = async () => {
  await mongoose.connect(uri, {
    dbName: "Project",
  });
};

const database = mongoose.connection;

database.on("error", (error) => {
  //האזנה לאירועים-במקרה הזה לerror
  console.log(error);
});

database.once("connected", () => {
  //once אומר שזה יקרה רק פעם אחת, כשמתבצעת התחברות מוצלחת
  console.log("Database connected!");
});

export default connectDB;
