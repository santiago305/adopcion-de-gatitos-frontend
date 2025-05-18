import { lazy, ReactNode } from "react";
const Header = lazy(()=> import("@/components/header/Header"))
const Footer = lazy(()=> import("@/components/footer/Footer"))

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full h-1000 ">{children}</main>
      <Footer />
    </div>
  );
}
