import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/home"; // דף הבית
import AboutPage from "./components/footerCom/about/about"; // דף אודות
import Branches from "./components/footerCom/Branches/branches"; // דף סניפים
import Policy from "./components/footerCom/policy/policy"; // דף תקנון
import ContactPage from "./components/footerCom/ContactUs/contactUs"; // דף צור קשר
import CategoryPage from "./components/Category/category"; // דף קטגוריה
import ProductDetailsPage from "./components/products/productDetails"; // דף פרטי מוצר
import Root from "./components/Root/Root"; // דף שורש
import Cart from "./components/HeaderCom/cart/cart"; // דף סל קניות
import LoginSingUp from "./components/HeaderCom/singUpAndLogin/LoginToSingUp"; // דף התחברות והרשמה
import ButtonAdmin from "./components/HeaderCom/onlyAdmin/buttonAdmin";
import AddProduct from "./components/HeaderCom/onlyAdmin/addProduct";
import UpdateProduct from "./components/HeaderCom/onlyAdmin/updateProduct";
import AddCategory from "./components/HeaderCom/onlyAdmin/addCategory";
import UpdateCategory from "./components/HeaderCom/onlyAdmin/updateCategory";
import SeeUsers from "./components/HeaderCom/onlyAdmin/seeUsers";
import SeeOrders from "./components/HeaderCom/onlyAdmin/seeOrders";
import Account from "./components/HeaderCom/account/account"; // דף חשבון משתמש
import Payment from "./components/payment/payment";
import OrderSuccess from "./components/payment/orderSuccess";
import MyOrders from "./components/HeaderCom/account/myOrders";
import OrderDetails from "./components/HeaderCom/account/orderDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/branches",
          element: <Branches />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/category/:id",
          element: <CategoryPage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailsPage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/Login",
          element: <LoginSingUp />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/admin",
          element: <ButtonAdmin />,
        },
        {
          path: "/addProduct",
          element: <AddProduct />,
        },
        {
          path: "/updateProduct",
          element: <UpdateProduct />,
        },
        {
          path: "/addCategory",
          element: <AddCategory />,
        },
        {
          path: "/updateCategory",
          element: <UpdateCategory />,
        },
        {
          path: "/seeUsers",
          element: <SeeUsers />,
        },
        {
          path: "/seeOrders",
          element: <SeeOrders />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/orderSuccess",
          element: <OrderSuccess />,
        },
        {
          path: "/myOrders",
          element: <MyOrders />,
        },
        {
          path: "/policy",
          element: <Policy />,
        },
        {
          path: "orderDetails/:id",
          element: <OrderDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
