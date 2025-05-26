import { useLocationFlashMessage } from "@/hooks/useLocationFlashMessage";



export default function Home() {
  useLocationFlashMessage();
    return (
      <>
        <div
        className="w-full h-screen bg-cover bg-center bg-amber-300"
        style={{ backgroundImage: "url('/assets/fondohome.webp')" }}
        >

        </div>
      </> 
    );
}
