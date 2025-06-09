import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  imagen: FileList;
  nombre: string;
  especie: string;
  raza: string;
  estado: "Disponible" | "Adoptado" | "Otro";
  enfermedad: string;
  edad: string;
  sexo: "Macho" | "Hembra" | "Otro";
  personalidad: string;
  caracteristicas: string;
  fechaIngreso: string;
  estadoActivo: "Activo" | "Inactivo";
};

const FormularioNuevaMascota: React.FC = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      estado: "Disponible",
      sexo: "Macho",
      estadoActivo: "Activo",
    },
  });

  const imagenFileList = watch("imagen");

  useEffect(() => {
    if (imagenFileList && imagenFileList.length > 0) {
      const file = imagenFileList[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [imagenFileList]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Nueva mascota:", data);
    alert("Mascota agregada correctamente (simulado).");
    navigate("/mascotas");
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 min-h-[650px] text-sm">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Nueva Mascota</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 w-full flex flex-col">
            <label className="block font-semibold mb-2">Imagen</label>
            <input
              type="file"
              accept="image/*"
              {...register("imagen", { required: "La imagen es obligatoria" })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            {errors.imagen && (
              <p className="text-red-500 text-xs mb-2">{errors.imagen.message}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                className="w-full rounded max-h-64 object-cover mb-3"
              />
            )}
          </div>

          <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input
                type="text"
                {...register("nombre", { required: "El nombre es obligatorio" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Nombre de la mascota"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Especie</label>
              <input
                type="text"
                {...register("especie", { required: "La especie es obligatoria" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Gato, Perro, etc."
              />
              {errors.especie && (
                <p className="text-red-500 text-xs mt-1">{errors.especie.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Raza</label>
              <input
                type="text"
                {...register("raza", { required: "La raza es obligatoria" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Raza de la mascota"
              />
              {errors.raza && (
                <p className="text-red-500 text-xs mt-1">{errors.raza.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Edad</label>
              <input
                type="text"
                {...register("edad", { required: "La edad es obligatoria" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Ej: 3 meses, 1 año"
              />
              {errors.edad && (
                <p className="text-red-500 text-xs mt-1">{errors.edad.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Estado</label>
              <select
                {...register("estado", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="Disponible">Disponible</option>
                <option value="Adoptado">Adoptado</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Sexo</label>
              <select
                {...register("sexo", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Estado</label>
              <select
                {...register("estadoActivo", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="Activo">Disponible</option>
                <option value="Inactivo">Adoptado</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Fecha de ingreso</label>
              <input
                type="date"
                {...register("fechaIngreso", { required: "Fecha es obligatoria" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.fechaIngreso && (
                <p className="text-red-500 text-xs mt-1">{errors.fechaIngreso.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 w-full flex flex-col gap-5">
          <div>
            <label className="block font-semibold mb-1">Enfermedad</label>
            <input
              type="text"
              {...register("enfermedad")}
              className="w-full border border-gray-300 rounded px-3 py-1"
              placeholder="Descripción de enfermedad (si aplica)"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Personalidad</label>
            <textarea
              {...register("personalidad")}
              className="w-full border border-gray-300 rounded px-3 py-1 resize-y"
              rows={2}
              placeholder="Descripción de la personalidad"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Características</label>
            <textarea
              {...register("caracteristicas")}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-y"
              rows={2}
              placeholder="Otras características importantes"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => navigate("/mascotas")}
            className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioNuevaMascota;