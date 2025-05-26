import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "./logo";
import HeaderNav from "./HeaderNav";
import HeaderUserAction from "./HeaderUserAction";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 300) {
        setShowHeader(true);
      } else {
        setShowHeader(currentScroll < lastScrollY);
      }
      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 w-full h-20 p-2.5 z-50 transition-transform duration-300",
          showHeader ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <section
          className="w-full h-full max-w-[1200px] m-auto flex bg-white/80 
                     backdrop-blur-md rounded-4xl px-10"
        >
          <div className="w-full h-full flex items-center justify-between">
            <div className="md:hidden">
              <MobileMenuButton isOpen={menuOpen} toggle={toggleMenu} />
            </div>

            <Logo className="w-[80px]" />

            <div className="flex gap-10">
              <HeaderNav />
              <HeaderUserAction />
            </div>
          </div>
        </section>
      </div>
      <MobileMenu isOpen={menuOpen} close={closeMenu} />
    </>
  );
}
