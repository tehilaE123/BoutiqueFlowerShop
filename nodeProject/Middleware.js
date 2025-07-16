import crypto from "crypto";
import jwt from "jsonwebtoken";

// מידלוור שמקצה מזהה ומדפיס משהו
export const logMiddleware = (req, res, next) => {
  req.UUID = crypto.randomUUID();
  // ניתן להוסיף כאן לוגיקה נוספת כמו שמירת ה-UUID במסד נתונים או לוג
  //req.startTime = Date.now();
  console.log(`request ${req.UUID} started`);

  //הוספת לוג בסיום הבקשה
  // res.on("finish", () => {
  //   const duration = Date.now() - req.startTime;
  //   console.log(`request ${req.UUID} finished in ${duration}ms`);
  // });
  next();
};

// מידלוור שתגיע אליו כל בקשה מהלקוח
// כדי לבדוק את הטוקן שהתקבל
// כל בקשה- חוץ מאשר בקשות התחברות והרשמה
export const jwtMiddleware = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = bearerHeader.slice(7); // הסר את "Bearer "
  try {
    const secret = "8t7r5v@#hk";
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;

    req.role = decoded.role;
    req.name = decoded.name;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// מידלוור שתגיע אליו כל בקשה מהלקוח
// כדי לבדוק אם המשתמש הוא מנהל
export const IsAdminMiddleware = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
