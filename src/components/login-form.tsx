import { useState } from "react";
import { cn } from "@/lib/utils";
import { UrlPage } from "@/router/RouterTypes";
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
  const { isAuthenticated, login } = useAuth();
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
  });

  if (isAuthenticated) {
    return <AfterLoginRedirect />; 
  }


  const onSubmit = async (data: LoginCredentials) => {
    setSubmitting(true);
    try {
      await login(data); 
    } catch (error: any) {
      const message = error.response?.data;
      console.log(message)
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
