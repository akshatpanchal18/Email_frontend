import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isAuth={true} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
