import { lazy } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(()=> import("@/components/header/Header"))
const Footer = lazy(()=> import("@/components/footer/Footer"))


export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="w-full flex-1 flex">
        <div className="w-full">
          <Outlet/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
