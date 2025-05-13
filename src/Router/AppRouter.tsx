import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuth } from "@/hooks/useAuth";

// 📦 Carga dinámica de módulos completos
const PublicRoutes = lazy(() => import("./modules/PublicRoutes"));
const AuthRoutes = lazy(() => import("./modules/AuthRoutes"));
const DashboardRoutes = lazy(() => import("./modules/DashboardRoutes"));
const ClientRoutes = lazy(() => import("./modules/ClientRoutes"));

/**
 * AppRouter maneja las rutas de la aplicación, cargando módulos de forma condicional
 * para optimizar el rendimiento y aplicar las restricciones de acceso correspondientes.
 */
export default function AppRouter() {
  const { isAuthenticated, userRole, hasClient } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div className="text-white p-4">Cargando página...</div>}>
        <Routes>
          {/* 📖 Rutas públicas (siempre disponibles) */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* 🔐 Rutas de autenticación (solo si NO está autenticado) */}
          {!isAuthenticated && (
            <Route path="/*" element={<AuthRoutes />} />
          )}

          {/* 👤 Rutas para completar registro de cliente (si es user y no tiene cliente) */}
          {isAuthenticated && userRole === "user" && hasClient === false && (
            <Route path="/*" element={<ClientRoutes />} />
          )}

          {/* 📊 Rutas de Dashboard (solo si está autenticado) */}
          {isAuthenticated && (
            <Route path="/*" element={<DashboardRoutes />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}
