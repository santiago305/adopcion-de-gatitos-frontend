import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routesConfig } from "./config/routesConfig";
import { RouteConfig } from "./types/RouterTypes";

/**
 * Función recursiva para renderizar rutas, incluyendo layouts y guards.
 * 
 * @param {RouteConfig[]} routes - Lista de rutas configuradas.
 * @returns {React.ReactElement[]} Lista de componentes <Route />.
 */
const renderRoutes = (routes: RouteConfig[]): React.ReactElement[] => 
  routes.map(({ path, component: Component, guard: Guard, layout: Layout, children }, index) => {
    const content = Layout ? (
      <Layout>
        <Component />
      </Layout>
    ) : (
      <Component />
    );

    return (
      <Route
        key={index}
        path={path}
        element={Guard ? <Guard>{content}</Guard> : content}
      >
        {children && renderRoutes(children)}
      </Route>
    );
  });

/**
 * Componente principal de enrutamiento de la aplicación.
 * 
 * Utiliza Suspense para carga perezosa de las vistas y renderiza
 * las rutas configuradas dinámicamente desde routesConfig.
 */
export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div className="text-white p-4">Cargando página...</div>}>
        <Routes>
          {renderRoutes(routesConfig)}
        </Routes>
      </Suspense>
    </Router>
  );
}
