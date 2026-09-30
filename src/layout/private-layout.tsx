import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import DummyAds from "../ads/dummy-ads";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className=" p-4 md:p-4">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Main application */}
          <section className="min-w-0">
            <Outlet />
          </section>

          {/* Advertisement space */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <DummyAds height="500px" />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
