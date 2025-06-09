import React, { useEffect, useState } from 'react';

type SolicitudAdopcion = {
  id: string;
  nombreAdoptante: string;
  email: string;
  mascotaSolicitada: string;
  fechaSolicitud: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
};

interface Props {
  nombreUsuario: string;
  emailUsuario: string;
  solicitudes: SolicitudAdopcion[];
  onVolver: () => void;
}

const Solicitudes: React.FC<Props> = ({ nombreUsuario, emailUsuario, solicitudes, onVolver }) => {
  const solicitudesUsuario = solicitudes.filter((s) => s.email === emailUsuario);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <button onClick={onVolver} style={{ marginBottom: '20px', background: '#ddd', border: 'none', padding: '6px 12px', borderRadius: '8px' }}>
        ← Volver
      </button>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Historial de solicitudes de {nombreUsuario}</h2>
      {solicitudesUsuario.length === 0 ? (
        <p>No hay solicitudes registradas para este usuario.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {solicitudesUsuario.map((s) => (
            <li key={s.id} style={{ marginBottom: '12px', padding: '12px', background: '#f9f9f9', borderRadius: '12px' }}>
              <strong>Mascota:</strong> {s.mascotaSolicitada} <br />
              <strong>Fecha:</strong> {s.fechaSolicitud} <br />
              <strong>Estado:</strong> <span style={{ textTransform: 'capitalize' }}>{s.estado}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Solicitudes;