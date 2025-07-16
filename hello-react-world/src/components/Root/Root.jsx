import { Outlet } from "react-router-dom";
import Header from "../HeaderCom/header";
import Footer from "../footerCom/footer";
import ScrollToTop from "../ScrollToTop";
export default function Root() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
