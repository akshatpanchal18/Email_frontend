import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import VerticalSection from "../ads/content/vertical-section";
import HorizontalSection from "../ads/content/horizontal-section";

import { useState } from "react";

export type LayoutCtx = { leftSlot: HTMLDivElement | null };
interface Props {
  isPublic: boolean;
}
const RootLayout = ({ isPublic }: Props) => {
  const [leftSlot, setLeftSlot] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background lg:h-screen lg:overflow-hidden">
      {isPublic ? <Navbar /> : <Header />}
      <main className="min-h-0 flex-1 p-4">
        <div className="mx-auto grid h-full max-w-[1600px] gap-4 lg:grid-cols-[280px_minmax(0,1fr)_280px]">
          <aside className="hidden min-h-0 flex-col gap-4 lg:flex">
            <div ref={setLeftSlot} /> {/* empty unless a page fills it */}
            <div className="mt-auto">
              <HorizontalSection />
            </div>
          </aside>

          <section className="min-h-0 min-w-0 overflow-y-auto">
            <Outlet context={{ leftSlot } satisfies LayoutCtx} />
          </section>

          <aside className="hidden min-h-0 lg:block">
            <VerticalSection />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default RootLayout;
import { createPortal } from "react-dom";
import { useOutletContext } from "react-router-dom";
import Navbar from "./components/navbar";

export const LeftRail = ({ children }: { children: React.ReactNode }) => {
  const { leftSlot } = useOutletContext<LayoutCtx>();
  return leftSlot ? createPortal(children, leftSlot) : null;
};
