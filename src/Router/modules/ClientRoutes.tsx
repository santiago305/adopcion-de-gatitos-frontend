import { Routes, Route } from "react-router-dom";
import RequireClientRegister from "../guards/RequireClientRegister";
import ClientsRegister from "@/pages/clients/ClientsRegister";

/**
 * Rutas específicas para usuarios en proceso de registro como cliente.
 */
export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/clientsregister" element={
        <RequireClientRegister>
          <ClientsRegister />
        </RequireClientRegister>
      } />
    </Routes>
  );
}
