import React, { useEffect, useState } from 'react';

type Usuario = {
  nombre: string;
  email: string;
};

type SolicitudAdopcion = {
  id: string;
  nombreAdoptante: string;
  email: string;
  mascotaSolicitada: string;
  fechaSolicitud: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
};

interface Props {
  solicitudes: SolicitudAdopcion[];
  onVerHistorial: (usuario: Usuario) => void;
}

const ListaSolicitudes: React.FC<Props> = ({ solicitudes, onVerHistorial }) => {
  const [agrupadas, setAgrupadas] = useState<Record<string, Usuario & { cantidad: number }>>({});

  useEffect(() => {
    const agrupadasTemp: Record<string, Usuario & { cantidad: number }> = {};
    solicitudes.forEach((sol) => {
      if (!agrupadasTemp[sol.email]) {
        agrupadasTemp[sol.email] = {
          nombre: sol.nombreAdoptante,
          email: sol.email,
          cantidad: 1,
        };
      } else {
        agrupadasTemp[sol.email].cantidad += 1;
      }
    });
    setAgrupadas(agrupadasTemp);
  }, [solicitudes]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: '#fefefe', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Lista de Solicitudes por Usuario</h2>
      {Object.keys(agrupadas).length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No hay solicitudes registradas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
          <thead>
            <tr>
              <th style={thEstilo}>Nombre</th>
              <th style={thEstilo}>Email</th>
              <th style={thEstilo}>Cantidad</th>
              <th style={thEstilo}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(agrupadas).map((usuario) => (
              <tr key={usuario.email} style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <td style={tdEstilo}>{usuario.nombre}</td>
                <td style={tdEstilo}>{usuario.email}</td>
                <td style={tdEstilo}>{usuario.cantidad}</td>
                <td style={tdEstilo}>
                  <button
                    onClick={() => onVerHistorial({ nombre: usuario.nombre, email: usuario.email })}
                    style={{
                      background: '#6d28d9',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Más información
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thEstilo: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px',
  fontWeight: 600,
  color: '#444',
};

const tdEstilo: React.CSSProperties = {
  padding: '12px',
  color: '#333',
};

export default ListaSolicitudes;