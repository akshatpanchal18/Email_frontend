import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import DummyAds from "../ads/dummy-ads";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
          {/* Public content */}
          <section className="min-w-0">
            <Outlet />
          </section>

          {/* Advertisement */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DummyAds height="500px" />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
