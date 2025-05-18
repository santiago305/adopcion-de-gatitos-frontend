import { lazy } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(()=> import("@/components/header/Header"))
const Footer = lazy(()=> import("@/components/footer/Footer"))


export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full h-1000 ">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}
