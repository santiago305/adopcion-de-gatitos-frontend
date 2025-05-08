import { useState } from "react";
import { registerUser } from "@/api/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { UrlPage } from "@/router/RouterTypes";
import { useFlashMessage } from "@/context/FlashMessageContext";
import { validateRegister } from "@/validations/validateRegister";
import { RegisterValidationErrors } from "@/validations/validationstype";
import { errorResponse, successResponse } from "@/common/utils/response";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const LoginRoute = UrlPage.find(route => route.name === "Login");
  const ClientsRegisterRoute = UrlPage.find(route => route.name === "ClientRegister");
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();

  if (!LoginRoute) return null;

  const validate = () => {
    const validationErrors = validateRegister({ email, password, name });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFlash(); 

    if (!validate()) return;

    setSubmitting(true);
    try {
      await registerUser({ email, password, name });
      if (!ClientsRegisterRoute) {
        showFlash(errorResponse("no se encontro la url"));
        return;
      }
      navigate(ClientsRegisterRoute.url, {
        state: {
          flashMessage: successResponse("Inicio de sesión exitoso"),
        },
      });
      
      
    } catch (error: any) {
      const message = error.response?.data?.message;
      showFlash({ type: message.type, message: message.message });
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Registrate con tu cuenta
          </CardTitle>
          <CardDescription
          className="text-center"
          >
            Registrate hoy para obtener todos los productos que desees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-1">
                <Label htmlFor="email">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="jose mauricio"
                />
                <div
                className="min-h-3 h-auto"
                >
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@e123.com"
                />
                <div
                className="min-h-3 h-auto"
                >
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                className="min-h-3 h-auto"
                >
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Cargando..." : "Register"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              ¿ya tienes una cuenta?{" "}
              <Link to={LoginRoute.url} className="underline underline-offset-4">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default RegisterForm