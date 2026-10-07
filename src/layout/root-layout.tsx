import { Outlet } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

interface Props {
  isPublic: boolean;
}

const RootLayout = ({ isPublic }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      {isPublic ? <Navbar /> : <Header />}

      {/* Page content */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
