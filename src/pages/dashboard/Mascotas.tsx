import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mascota = {
  id: number;
  nombre: string;
  tipo: string;
  edad: string;
  imagen: string;
  estado: "Disponible" | "Adoptado";
  sexo: "Macho" | "Hembra";
};

const mascotasData: Mascota[] = [
  {
    id: 1,
    nombre: "Luna",
    tipo: "Gatita",
    edad: "3 meses",
    imagen: "https://placekitten.com/300/200",
    estado: "Disponible",
    sexo: "Hembra",
  },
  {
    id: 2,
    nombre: "Max",
    tipo: "Perrito",
    edad: "1 año",
    imagen: "https://placedog.net/300/200?id=2",
    estado: "Adoptado",
    sexo: "Macho",
  },
  // más mascotas...
];

const ITEMS_PER_PAGE = 6;

const Mascotas: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [busqueda, setBusqueda] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [filtroSexo, setFiltroSexo] = useState<string>("");

  const mascotasFiltradas = mascotasData.filter((mascota) => {
    const coincideBusqueda = `${mascota.nombre} ${mascota.tipo} ${mascota.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === "" || mascota.estado === filtroEstado;
    const coincideTipo = filtroTipo === "" || mascota.tipo.toLowerCase().includes(filtroTipo.toLowerCase());
    const coincideSexo = filtroSexo === "" || mascota.sexo === filtroSexo;

    return coincideBusqueda && coincideEstado && coincideTipo && coincideSexo;
  });

  const totalItems = mascotasFiltradas.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = mascotasFiltradas.slice(startIndex, endIndex);

  const handleEditar = (id: number) => {
    navigate(`/mascotas/editar/${id}`);
  };

  const handleEliminar = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar esta mascota?")) {
      alert(`Eliminar mascota con id: ${id}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-xl font-bold text-gray-800">🐾 Gestión de Mascotas</h1>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="🔍 Buscar mascota..."
            className="w-full sm:w-60 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={() => navigate("/mascotas/nueva")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg shadow text-sm transition"
          >
            + Agregar
          </button>
        </div>
      </div>

      {/* Filtros adicionales */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-4">
        <select
          value={filtroEstado}
          onChange={(e) => {
            setFiltroEstado(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="Adoptado">Adoptado</option>
        </select>

        <input
          type="text"
          value={filtroTipo}
          onChange={(e) => {
            setFiltroTipo(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Tipo (ej. Gatita)"
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        />

        <select
          value={filtroSexo}
          onChange={(e) => {
            setFiltroSexo(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Todos los sexos</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Foto</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Edad</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((mascota) => (
              <tr key={mascota.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={mascota.imagen}
                    alt={mascota.nombre}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-900">{mascota.nombre}</td>
                <td className="px-4 py-2 text-gray-700">{mascota.tipo}</td>
                <td className="px-4 py-2 text-gray-700">{mascota.edad}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      mascota.estado === "Disponible"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {mascota.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleEditar(mascota.id)}
                    className="text-pink-600 hover:underline text-sm mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(mascota.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6 text-sm">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages >= 1 && (
        <div className="mt-6 flex justify-center items-center gap-4 text-sm">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-full border border-gray-300 ${
              currentPage === 1
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
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 rounded-full border border-gray-300 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-pink-600 hover:bg-pink-100"
            }`}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default Mascotas;
