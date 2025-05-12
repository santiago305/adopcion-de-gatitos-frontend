import { useState } from "react";
import { loginUser } from "@/services/authService";
import { cn } from "@/lib/utils";
import { UrlPage } from "@/router/RouterTypes";
import { useFlashMessage } from "@/context/FlashMessageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginCredentials } from "@/types/auth";
import { LoginSchema } from "@/schemas/authSchemas";
import FieldError from "./ui/FieldError";

import AfterLoginRedirect from "@/guards/AfterLoginRedirect";
import { useAuth } from "@/hooks/useAuth";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const RegisterRoute = UrlPage.find(route => route.name === "Register");
  const { isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const { showFlash, clearFlash } = useFlashMessage();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
  });

  if (isAuthenticated) {
    console.log('redireccion')
  return <AfterLoginRedirect />;
  }


  const onSubmit = async (data: LoginCredentials) => {
    clearFlash();
    setSubmitting(true);
    try {
      await loginUser(data); 
    } catch (error: any) {
      const message = error.response?.data;
      showFlash({ type: message?.type || "error", message: message?.message || "Error inesperado" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!RegisterRoute) return null;

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
              <div className="grid gap-1">
                <Label>Correo Electrónico</Label>
                <Input {...register('email')} placeholder="m@e123.com" />
                <FieldError error={errors.email?.message} />
              </div>

              <div className="grid gap-1">
                <Label>Contraseña</Label>
                <Input {...register('password')} type="password" />
                <FieldError error={errors.password?.message} />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Cargando..." : "Login"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link to={RegisterRoute.url} className="underline underline-offset-4">
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
