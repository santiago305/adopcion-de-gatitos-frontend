import { Lock, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const GestionCuenta = () => {
  const [form, setForm] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleCambiar = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nueva !== form.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Contraseña cambiada (simulado)");
  };

  const handleEliminarCuenta = () => {
    const confirmacion = confirm("¿Estás segur@ de eliminar tu cuenta?");
    if (confirmacion) {
      alert("Cuenta eliminada (simulado)");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 flex flex-col items-center">
      <div className="flex flex-col items-center mb-14">
        <Lock className="w-10 h-10 text-red-600 mb-3" />
        <h1 className="text-xl font-semibold">Gestión de cuenta</h1>
        <p className="text-gray-600 text-base text-center max-w-md mt-2">
          Aquí puedes cambiar tu contraseña o eliminar tu cuenta.
        </p>
      </div>

      <form
        onSubmit={handleCambiar}
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8"
      >
        <div>
          <Label htmlFor="actual" className="text-base mb-2 block">
            Contraseña actual
          </Label>
          <Input
            id="actual"
            type="password"
            value={form.actual}
            onChange={handleChange}
            className="text-base py-3"
          />
        </div>

        <div>
          <Label htmlFor="nueva" className="text-base mb-2 block">
            Nueva contraseña
          </Label>
          <Input
            id="nueva"
            type="password"
            value={form.nueva}
            onChange={handleChange}
            className="text-base py-3"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="confirmar" className="text-base mb-2 block">
            Confirmar nueva contraseña
          </Label>
          <Input
            id="confirmar"
            type="password"
            value={form.confirmar}
            onChange={handleChange}
            className="text-base py-3"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <Button type="submit" className="text-base px-6 py-3">
            Guardar cambios
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleEliminarCuenta}
            className="flex items-center gap-2 text-base px-6 py-3"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GestionCuenta;
