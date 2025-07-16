// import mongoose from "mongoose";
// import Order from "../models/orderModel.js";

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate("products.product_Id");

//     // עדכון סטטוסים לפני ההחזרה
//     const now = new Date();
//     const updatedOrders = await Promise.all(
//       orders.map(async (order) => {
//         const diffInHours = (now - order.OrderDate) / (1000 * 60 * 60);
//         if (order.status === "ממתין" && diffInHours > 24) {
//           order.status = "סופק";
//           await order.save(); // שמירה למסד הנתונים
//         }
//         return order;
//       })
//     );

//     res.status(200).json({ success: true, data: updatedOrders });
//   } catch (error) {
//     console.log("error in get", error.message);
//     res.status(500).json({ success: false, message: "server error" });
//   }
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate(
//       "products.product_Id"
//     );
//     res.json(order);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const addOrder = async (req, res) => {
//   const order = req.body;

//   if (
//     !order.user_Id ||
//     !Array.isArray(order.products) ||
//     order.products.length === 0
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "please provide all fields" });
//   }

//   const newOrder = new Order(order);

//   try {
//     await newOrder.save();
//     res.status(201).json({ success: true, data: newOrder });
//   } catch (error) {
//     console.error("Error in create order:", error.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const order = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Invalid Order Id" });
//   }

//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(id, order, {
//       new: true,
//     });

//     res.status(200).json({ success: true, data: updatedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Invalid order Id" });
//   }

//   try {
//     await Order.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Order deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "server error" });
//   }
// };
import mongoose from "mongoose";
import Order from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("products.product_Id");

    // הערה: ביטלתי זמנית את העדכון האוטומטי כדי לבדוק את הפונקציונליות
    // אם תרצה לחזור לעדכון האוטומטי, פשוט הסר את ההערה מהקוד למטה

    /*
    // עדכון סטטוסים לפני ההחזרה
    const now = new Date();
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const diffInHours = (now - order.OrderDate) / (1000 * 60 * 60);
        if (order.status === "ממתין" && diffInHours > 24) {
          order.status = "סופק";
          await order.save(); // שמירה למסד הנתונים
        }
        return order;
      })
    );
    */

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("error in get", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.product_Id"
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addOrder = async (req, res) => {
  const order = req.body;

  if (
    !order.user_Id ||
    !Array.isArray(order.products) ||
    order.products.length === 0
  ) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  // וודא שהסטטוס הוא 'ממתין' כברירת מחדל
  const newOrder = new Order({
    ...order,
    status: order.status || "ממתין",
    OrderDate: new Date(), // וודא שהתאריך נשמר
  });

  try {
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Error in create order:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Order Id" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid order Id" });
  }

  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
