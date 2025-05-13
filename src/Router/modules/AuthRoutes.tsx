import { Routes, Route } from "react-router-dom";
import RedirectIfAuth from "../guards/RedirectIfAuth";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

/**
 * Rutas relacionadas con la autenticación (login y registro).
 * Accesibles solo si NO estás autenticado.
 */
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <RedirectIfAuth>
          <Login />
        </RedirectIfAuth>
      } />
      <Route path="/register" element={
        <RedirectIfAuth>
          <Register />
        </RedirectIfAuth>
      } />
    </Routes>
  );
}
