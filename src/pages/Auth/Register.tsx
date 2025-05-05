import { FlashMessageRoot } from "@/components/flashMessage/FlashMessageRoot"
import { RegisterForm } from "@/components/register-form"
import { FlashMessageProvider } from "@/context/FlashMessageContext"
export default function Page() {
  return (
    <FlashMessageProvider>
      <FlashMessageRoot />
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>
    </FlashMessageProvider>
  )
}
