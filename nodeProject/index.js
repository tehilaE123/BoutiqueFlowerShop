import express from "express";
import cors from "cors";
import connectDB from "./database.js";
import productRouter from "./Router/productRouter.js"; //מייבאת את הראוטר של המוצרים
import categoryRouter from "./Router/categoryRouter.js"; //מייבאת את הראוטר של הקטגוריות
import shoppingCartRouter from "./Router/shoppingCartRouter.js"; //מייבאת את הראוטר של עגלת הקניות
import orderRouter from "./Router/orderRouter.js"; //מייבאת את הראוטר של ההזמנות
import userRouter from "./Router/userRouter.js"; //מייבאת את הראוטר של המשתמשים

const app = express(); // יוצרת את האפליקציה של Express
const port = 3000; //משתנה שמכיל את הפורט שעליו השרת ירוץ

connectDB(); //חיבור למסד הנתונים

app.use(cors()); //מאפשרת חיבור בין השרת ללקוח

app.use(express.json()); //אומר לשרת שכל בקשה שמגיעה עם גוף בפורמט JSON – תפורש אוטומטית כאובייקט JavaScript

app.use("/api/products", productRouter); //מגדירה שהנתיב '/api/products' יטופל על ידי הראוטר של המוצרים
app.use("/api/categories", categoryRouter); //מגדירה שהנתיב '/api/categories' יטופל על ידי הראוטר של הקטגוריות
app.use("/api/shoppingCart", shoppingCartRouter); //מגדירה שהנתיב '/api/shoppingCart' יטופל על ידי הראוטר של עגלת הקניות
app.use("/api/orders", orderRouter); //מגדירה שהנתיב '/api/orders' יטופל על ידי הראוטר של ההזמנות
app.use("/api/users", userRouter); //מגדירה שהנתיב '/api/users' יטופל על ידי הראוטר של המשתמשים

app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
); //מאזינה לפורט 3000 ומדפיסה לקונסול שהשרת רץ
