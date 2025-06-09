import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Solicitud = {
  id: number;
  usuario: string;
  mascota: string;
  fecha: string;
  estado: "Pendiente" | "Aprobada" | "Rechazada";
};

const solicitudesData: Solicitud[] = [
  { id: 1, usuario: "Juan Pérez", mascota: "Luna", fecha: "2025-06-01", estado: "Pendiente" },
  { id: 2, usuario: "Ana Gómez", mascota: "Max", fecha: "2025-06-02", estado: "Aprobada" },
  { id: 3, usuario: "Luis Díaz", mascota: "Nina", fecha: "2025-06-03", estado: "Rechazada" },
  { id: 4, usuario: "Marta Ruiz", mascota: "Boby", fecha: "2025-06-04", estado: "Pendiente" },
  { id: 5, usuario: "Carlos Ramos", mascota: "Lola", fecha: "2025-06-04", estado: "Pendiente" },
  // más solicitudes...
];

const ITEMS_PER_PAGE = 5;

const SolicitudesAdopcion: React.FC = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const solicitudesFiltradas = solicitudesData.filter((s) => {
    const coincideBusqueda =
      s.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.fecha.includes(busqueda);

    const coincideEstado = filtroEstado === "" || s.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  const totalSolicitudes = solicitudesFiltradas.length;
  const totalPages = Math.ceil(totalSolicitudes / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = solicitudesFiltradas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const cambiarPagina = (nueva: number) => {
    if (nueva >= 1 && nueva <= totalPages) setCurrentPage(nueva);
  };

  const contador = (estado: Solicitud["estado"]) =>
    solicitudesData.filter((s) => s.estado === estado).length;

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h1 className="text-xl font-bold text-gray-800">
          📄 Solicitudes de Adopción
        </h1>
        <span className="text-gray-600 text-sm sm:text-base">
          Total: {solicitudesData.length} solicitudes
        </span>
      </div>

      {/* Buscador + Filtros en la misma fila */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="🔍 Buscar por usuario o fecha..."
          className="w-full sm:w-304 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setFiltroEstado("");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
              filtroEstado === "" ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            Todas ({solicitudesData.length})
          </button>
          <button
            onClick={() => {
              setFiltroEstado("Pendiente");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
              filtroEstado === "Pendiente" ? "bg-yellow-200 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            Pendientes ({contador("Pendiente")})
          </button>
          <button
            onClick={() => {
              setFiltroEstado("Aprobada");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
              filtroEstado === "Aprobada" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            Aprobadas ({contador("Aprobada")})
          </button>
          <button
            onClick={() => {
              setFiltroEstado("Rechazada");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
              filtroEstado === "Rechazada" ? "bg-red-400 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            Rechazadas ({contador("Rechazada")})
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Mascota</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-800">{s.usuario}</td>
                <td className="px-4 py-2">{s.mascota}</td>
                <td className="px-4 py-2">{s.fecha}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      s.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : s.estado === "Aprobada"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/solicitudes/${s.id}`)}
                    className="text-pink-600 hover:underline text-sm"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center items-center gap-4 text-sm">
        <button
          onClick={() => cambiarPagina(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className={`w-8 h-8 rounded-full border border-gray-300 ${
            currentPage === 1 || totalPages === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-pink-600 hover:bg-pink-100"
          }`}
        >
          ←
        </button>

        <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
          {currentPage}
        </div>

        <button
          onClick={() => cambiarPagina(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`w-8 h-8 rounded-full border border-gray-300 ${
            currentPage === totalPages || totalPages === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-pink-600 hover:bg-pink-100"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SolicitudesAdopcion;