import { useState } from "react";
import { cn } from "@/lib/utils";
import { UrlPage } from "@/router/RouterTypes";
import { registerUser } from "@/services/authService";
import { errorResponse, successResponse } from "@/common/utils/response";
import { RegisterCredentials } from "@/types/auth";
import { RegisterSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useFlashMessage } from "@/context/FlashMessageContext";
import FieldError from "./ui/FieldError";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const LoginRoute = UrlPage.find(route => route.name === "Login");
  const ClientsRegisterRoute = UrlPage.find(route => route.name === "ClientRegister");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterSchema),
  });

  if (!LoginRoute) return null;

  const onSubmit =  async (data: RegisterCredentials) => {
    clearFlash(); 
    setSubmitting(true);
    try {
      await registerUser(data);
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
  }

  

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-1">
                <Label htmlFor="email">Nombre</Label>
                <Input {...register('name')}   placeholder="jose mauricio"/>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.name?.message} />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input {...register('email')} placeholder="m@e123.com"/>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.email?.message} />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input {...register('password')}/>
                <div className="min-h-3 h-auto">
                  <FieldError error={errors.password?.message} />
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