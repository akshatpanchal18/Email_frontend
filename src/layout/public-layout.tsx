import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isAuth={false} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
