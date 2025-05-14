import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Products from "@/pages/Product";
import ProductShow from "@/pages/Product.show";
import Error404 from "@/pages/Error404";

/**
 * Rutas públicas accesibles sin autenticación.
 */
export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:product" element={<ProductShow />} />
      <Route path="*" element={<Error404 />} />
    </>
  );
}
