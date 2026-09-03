import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isAuth={true} />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
