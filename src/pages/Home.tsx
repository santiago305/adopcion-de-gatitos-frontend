import ShimmerLoader from "@/components/loadings.tsx/ShimmerLoader";
import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";
import { checkTokenValidity } from "@/services/authService";
import { useEffect } from "react";


export default function Home() {
  useLocationFlashMessage();
  useEffect(() => {
    async function check() {
        const valid = await checkTokenValidity();
        console.log("checkTokenValidity returned:", valid);
    }
    check();
  }, []);
    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Home</h1>
            <p className="mt-4 text-lg">Welcome to the Home page!</p>
            <div
            className="w-64 h-64"
            >

            <ShimmerLoader/>
            </div>
        </div>
    );
}
