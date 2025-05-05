import { FlashMessageRoot } from "@/components/flashMessage/FlashMessageRoot";
import { LoginForm } from "@/components/login-form";
import { FlashMessageProvider } from "@/context/FlashMessageContext";

export default function Page() {
  return (
    <FlashMessageProvider>
      <FlashMessageRoot />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </FlashMessageProvider>
  );
}
