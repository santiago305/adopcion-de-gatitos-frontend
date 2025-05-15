import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginCredentials } from "@/types/auth";
import { LoginSchema } from "@/schemas/authSchemas";
import { useAuth } from "@/hooks/useAuth";
import FormField from "./ui/formField";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import { RoutesPaths } from "@/router/config/routesPaths";
import { successResponse } from "@/common/utils/response";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { showFlash, clearFlash } = useFlashMessage();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
  });

  // useAfterLoginRedirect();
  
  const onSubmit = async (data: LoginCredentials) => {
    clearFlash(); 
    setSubmitting(true);
    try {
      await login(data); 
      navigate("/", {
        replace: true,
        state: { flashMessage: successResponse("Inicio de sesión exitoso") },
      });
    } catch (error: any) {
      const message = error.response?.data;
      showFlash({ 
        type: message.type || "error",
        message: message.message || "Credenciales inválidas o error de red" 
        });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Inicia sesión en tu cuenta</CardTitle>
          <CardDescription>Ingrese su correo electrónico para iniciar sesión</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                name="email" 
                label="Correo Electrónico" 
                placeholder="m@e123.com" 
                register={register} 
                error={errors.email?.message} 
              />

              <FormField 
                name="password" 
                label="Contraseña" 
                placeholder="m@e123.com"
                type="password" 
                register={register} 
                error={errors.password?.message} 
              />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Cargando..." : "Login"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link to={RoutesPaths.register} className="underline underline-offset-4">
                Regístrate
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
