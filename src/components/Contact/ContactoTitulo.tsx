// ContactoTitulo.tsx
import React from "react";

/**
 * Componente que muestra el título principal y subtítulo
 * para la sección de Contacto & Ubicación.
 */
const ContactoTitulo: React.FC = () => {
  return (
    <div className="mt-10 p-6 max-w-7xl mx-auto">
      {/* Título principal */}
      <h1 className="text-3xl text-pink-600 font-bold text-center mb-2">
        Contacto & Ubicación
      </h1>

      {/* Subtítulo */}
      <p className="text-center text-gray-600 mb-6">
        ¿Listo para llenar tu vida de amor? ¡Adopta un compañero peludo en Piura!
        Contáctanos y te guiaremos en el proceso.
      </p>
    </div>
  );
};

export default ContactoTitulo;
