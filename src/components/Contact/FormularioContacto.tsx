import { useState } from "react";

const FormularioContacto = () => {
  const [otroAsunto, setOtroAsunto] = useState(false);

  const handleAsuntoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOtroAsunto(e.target.value === "Otro");
  };

  return (
    <div className="mt-1">
      {/* Título del formulario */}
      <h2 className="text-center text-gray-600 text-2xl font-semibold mb-4">
        Envíanos un mensaje
      </h2>

      <form
        action="https://formsubmit.co/adanaquemazaleslyegianella25@gmail.com"
        method="POST"
        className="space-y-4"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="http://localhost:5173/contact" />

        <input
          className="w-full border border-gray-300 rounded-md p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-300"
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
        />

        <input
          className="w-full border border-gray-300 rounded-md p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-300"
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          required
        />

        <select
          className="w-full border border-gray-300 rounded-md p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-300"
          name="asunto"
          onChange={handleAsuntoChange}
          required
        >
          <option value="" disabled selected>
            Selecciona un asunto
          </option>
          <option value="Adopción">Adopción</option>
          <option value="Información">Información</option>
          <option value="Voluntariado">Voluntariado</option>
          <option value="Donaciones">Donaciones</option>
          <option value="Otro">Otro</option>
        </select>

        {otroAsunto && (
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-300"
            type="text"
            name="otro_asunto"
            placeholder="Escribe tu asunto"
            required
          />
        )}

        <textarea
          className="w-full border border-gray-300 rounded-md p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-300"
          name="mensaje"
          placeholder="Mensaje"
          rows={4}
          required
        ></textarea>

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-md"
        >
          Enviar Mensaje
        </button>

        <p className="text-sm text-gray-500">
          *Intentaremos responder a tu mensaje en un plazo de 24-48 horas.
        </p>
      </form>
    </div>
  );
};

export default FormularioContacto;
