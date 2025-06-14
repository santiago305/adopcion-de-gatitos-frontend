import { lazy} from "react";

const RegisterForm = lazy(() => import("@/components/register-form"));

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-lg">
        <RegisterForm />
      </div>
    </div>
  )
}
