import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";

function ClientsRegister() {
    useLocationFlashMessage();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">ClientsRegister</h1>
            <p className="mt-4 text-lg">registraremos al cliente</p>
        </div>
    );
}
export default ClientsRegister;