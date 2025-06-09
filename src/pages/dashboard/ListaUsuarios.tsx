import React, { useState } from "react";
import { Users } from "lucide-react";

type Usuario = {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
};

const usuariosSimulados: Usuario[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@example.com",
    telefono: "+51 999 111 111",
    direccion: "Av. Siempre Viva 123, Lima",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    correo: "maria.gonzalez@example.com",
    telefono: "+51 999 222 222",
    direccion: "Calle Las Flores 456, Arequipa",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Ramírez",
    correo: "carlos.ramirez@example.com",
    telefono: "+51 999 333 333",
    direccion: "Jr. Independencia 789, Trujillo",
  },
  {
    id: 4,
    nombre: "Lucía",
    apellido: "Torres",
    correo: "lucia.torres@example.com",
    telefono: "+51 999 444 444",
    direccion: "Av. Universitaria 321, Cusco",
  },
  {
    id: 5,
    nombre: "Diego",
    apellido: "Rojas",
    correo: "diego.rojas@example.com",
    telefono: "+51 999 555 555",
    direccion: "Calle Central 654, Piura",
  },
];

const ITEMS_PER_PAGE = 4;

const ListaUsuarios: React.FC = () => {
  const [busqueda, setBusqueda] = useState<string>("");
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const usuariosFiltrados = usuariosSimulados.filter((usuario) =>
    `${usuario.nombre} ${usuario.apellido} ${usuario.correo}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalUsuarios = usuariosFiltrados.length;
  const totalPaginas = Math.ceil(totalUsuarios / ITEMS_PER_PAGE);
  const indiceInicio = (paginaActual - 1) * ITEMS_PER_PAGE;
  const indiceFin = indiceInicio + ITEMS_PER_PAGE;
  const usuariosPagina = usuariosFiltrados.slice(indiceInicio, indiceFin);

  const cambiarPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const cambiarPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Lista de Usuarios Registrados</h2>
        </div>

        <input
          type="text"
          placeholder="🔍 Buscar usuario..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          className="w-full md:w-60 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Mostrando <strong>{usuariosPagina.length}</strong> de <strong>{totalUsuarios}</strong> usuarios
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPagina.length > 0 ? (
              usuariosPagina.map((usuario) => (
                <tr key={usuario.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{usuario.id}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {usuario.nombre} {usuario.apellido}
                  </td>
                  <td className="px-4 py-2">{usuario.correo}</td>
                  <td className="px-4 py-2">{usuario.telefono}</td>
                  <td className="px-4 py-2">{usuario.direccion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6 text-sm">
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="mt-6 flex justify-center items-center gap-4 text-sm">
          <button
            onClick={cambiarPaginaAnterior}
            disabled={paginaActual === 1}
            className={`w-8 h-8 rounded-full border border-gray-300 ${
              paginaActual === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            ←
          </button>

          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {paginaActual}
          </div>

          <button
            onClick={cambiarPaginaSiguiente}
            disabled={paginaActual === totalPaginas}
            className={`w-8 h-8 rounded-full border border-gray-300 ${
              paginaActual === totalPaginas
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;
