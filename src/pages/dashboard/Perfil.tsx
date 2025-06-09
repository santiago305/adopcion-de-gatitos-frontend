import { useState } from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Perfil = () => {
  const [form, setForm] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@example.com",
    telefono: "+51 999 999 999",
    direccion: "Av. Siempre Viva 123, Lima",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cambios guardados (simulado)");
  };

  return (
    <div className="min-h-screen bg-white pt-10 px-6 flex flex-col items-center">
      <div className="flex flex-col items-center mb-10">
        <User className="w-12 h-12 text-blue-600 mb-2" />
        <h1 className="text-xl font-semibold">Bienvenido, {form.nombre}</h1>
        <p className="text-gray-600 text-sm text-center max-w-md mt-1">
          Aquí puedes actualizar tu información personal
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10"
      >
        <div className="p-2">
          <Label htmlFor="nombre" className="mb-1 block text-sm font-medium">
            Nombre
          </Label>
          <Input
            id="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="py-1.5 text-sm"
          />
        </div>

        <div className="p-2">
          <Label htmlFor="apellido" className="mb-1 block text-sm font-medium">
            Apellido
          </Label>
          <Input
            id="apellido"
            value={form.apellido}
            onChange={handleChange}
            className="py-1.5 text-sm"
          />
        </div>

        <div className="p-2">
          <Label htmlFor="correo" className="mb-1 block text-sm font-medium">
            Correo electrónico
          </Label>
          <Input
            id="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            className="py-1.5 text-sm"
          />
        </div>

        <div className="p-2">
          <Label htmlFor="telefono" className="mb-1 block text-sm font-medium">
            Teléfono
          </Label>
          <Input
            id="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="py-1.5 text-sm"
          />
        </div>

        <div className="md:col-span-2 p-2">
          <Label htmlFor="direccion" className="mb-1 block text-sm font-medium">
            Dirección
          </Label>
          <Input
            id="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="py-1.5 text-sm"
          />
        </div>

        <div className="md:col-span-2 p-2 flex justify-end mt-2">
          <Button type="submit" className="px-5 py-2 text-sm">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;
