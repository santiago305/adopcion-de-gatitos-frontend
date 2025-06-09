import React from "react";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "Admin" | "Usuario";
  estado: "Activo" | "Inactivo";
}

const UsersList: React.FC = () => {
  const usuarios: User[] = [
    { id: 1, nombre: "Ana Pérez", email: "ana.perez@mail.com", rol: "Admin", estado: "Activo" },
    { id: 2, nombre: "Juan Gómez", email: "juan.gomez@mail.com", rol: "Usuario", estado: "Activo" },
    { id: 3, nombre: "Luisa Martínez", email: "luisa.martinez@mail.com", rol: "Usuario", estado: "Inactivo" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Usuarios</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nombre</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rol</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.nombre}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.rol}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
